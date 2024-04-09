<?php

namespace Illuminate\Foundation\Auth;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
// use Mail;
use App\Models\User;
use App\Models\all_users;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

trait VerifiesEmails
{
    use RedirectsUsers;

    /**
     * Show the email verification notice.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(Request $request)
    {
        return view('auth.enterVerifyEmail');
    }
    public function confirm(Request $request)
    {
        $email = $request->email;
        $user = User::where("email", "=", $email)->first();
        if(!$user){
            return view('auth.enterVerifyEmail')->with([
                'message'=> 'Ийм имэйлтэй хэрэглэгч олдсонгүй, Та харьяа анги байгууллагынхаа хүний нөөцийн мэргэжилтэнд бүртгүүлнэ үү!',
            ]);
        }
        if(!is_null($user->email_verified_at)){
            return view('auth.passwords.success')->with(
                [
                    'message' => 'Имэйл аль хэдийн баталгаажсан байна'
                ]
            );
        }
        if(!$user){
            return view('auth.enterVerifyEmail')->with(["message"=>"Хэрэглэгч олдсонгүй"]);
        }else{
            if ($user->otp_created_at < Carbon::now()->subMinutes(15)->toDateTimeString() || $user->otp_created_at == null)
        {
            $otp = '';
            for ($x = 0; $x < 6; $x++)
            {
                $digit = rand(0, 9);
                $otp = $otp . '' . strval($digit);
            }
            $user->otp = $otp;
            $user->otp_tries = 0;
            $user->otp_created_at = now();
            $user->save();
            $namee = DB::table('pko_users')
            ->join('all_users', 'pko_users.allUsersID', '=', 'all_users.id')
            ->select('all_users.firstName')
            ->where('pko_users.ID', $user->id)
            ->first();
            $data = array(
                'email' => $user->email,
                'otp' => $user->otp,
                'name' => $namee->firstName,
            );
            Mail::send('Mail', $data, function ($messages) use ($data)
            {
                $messages->to($data['email']);
                $messages->subject('Таны баталгаажуулах код');
            });
            return view('auth.enterVerifyCode')->with([
                'message' => '',
                'email' => $user->email,
            ]);
        }
            return view('auth.enterVerifyCode')->with([
                'email' => $user->email,
            ]);
        }
    }

    public function confirmCode(Request $request)
    {
        $user = User::where('email', '=', $request->email)->first();
        if ($request->code == $user->otp)
        {
            $user->email_verified_at = now();
            $user->otp = null;
            $user->otp_tries = null;
            $user->otp_created_at = null;
            $user->reset_hash = bin2hex(random_bytes(20));
            $user->save();
            // return view('auth.passwords.success')->with(
            //     [
            //         'message' => 'имэйл амжилттай баталгаажлаа'
            //     ]
            // );
            //on successful verification
            return view('auth.success')->with([
                'message'=> '',
                'email' => $user->email,
                'reset_hash' => $user->reset_hash,
            ]);
        } else
        {
            if ($user->otp_tries > 3)
            {
                $user->otp = null;
                $user->otp_tries = null;
                $user->otp_created_at = null;
                $user->save();
                //on too many tries
                return view('auth.verifyError')->with([
                    'message' => 'Хэтэрхий олон оролдлого хийлээ'
                ]);
            }
            $user->otp_tries += 1;
            $user->save();
            if (!$user->otp)
            {
                return view('auth.verify');
            }
            //on wrong try
            return view('auth.enterVerifyCode')->with([
                'email' => $user->email,
                'message' => 'Буруу код'
            ]);
        }
    }
    protected function guard()
    {
        return Auth::guard();
    }
}
