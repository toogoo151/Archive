<?php

namespace Illuminate\Foundation\Auth;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\VerifiesEmails;
use App\Models\User;
use App\Models\all_users;
// use Mail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

trait ResetsPasswords
{
    use VerifiesEmails;
    public function showLinkRequestForm()
    {
        return view('auth.passwords.email');
    }
    public function checkEmail(Request $request)
    {
        $user = User::where('email', '=', $request->email)->first();
        if(!$user){
            return view('auth.enterVerifyEmail')->with([
                'message'=>'Ийм имэйлтэй хэрэглэгч олдсонгүй'
            ]);
        }
        if($user->email_verified_at == null){
            return $result = $this->confirm($request);
        }
        if($user){
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
            $name = DB::table("all_users")->where('id', '=', $user->allUsersID)->first();
            $data = array(
                'email' => $user->email,
                'otp' => $user->otp,
                'name' => $name->firstName,
            );
            Mail::send('resetMail', $data, function ($messages) use ($data)
            {
                $messages->to($data['email']);
                $messages->subject('Таны баталгаажуулах код');
            });
            return view('auth.passwords.enterResetCode')->with([
                'email' => $user->email,
                'message'=> '',
            ]);
        }
    }
    public function checkCode(Request $request)
    {
        $user = User::where('email', '=', $request->email)->first();
       if($request->code == $user->otp){
        $user->otp = null;
        $user->otp_tries = null;
        $user->otp_created_at = null;
        $user->reset_hash = bin2hex(random_bytes(20));
        $user->save();
        return view('auth.passwords.resetForm')->with([
            'message'=> '',
            'email' => $user->email,
            'reset_hash' => $user->reset_hash,
        ]);
       }else{
        $user->otp_tries += 1;
        $user->save();
        if($user->otp_tries >= 3){
            return view('auth.passwords.fail')->with([
                'message'=> 'Хэтэрхий олон буруу оролдлого хийлээ.',
            ]);
        }
        return view('auth.passwords.enterResetCode')->with([
            'email' => $user->email,
            'message'=> 'Буруу код',
        ]);
       }
    }
    public function update(Request $request)
    {
        $request->validate(['password' => 'required|min:8',
        'password_confirmation' => 'required|same:password',
        ]);
        $user = User::where('email', '=', $request->email)->first();
        $hash =  $_GET['hash'];
        if($user->reset_hash == $hash){
            $user->password = Hash::make($request->password);
            $user->reset_hash = null;
            $user->save();
            return view('auth.passwords.success')->with([
                'message'=>'нууц үг амжилттай шинэчлэгдлээ.'
            ]);
        }else{
            return 'Дахин оролдоно уу.';
        }
    }
    public function setPassword(Request $request){
        return view('auth.passwords.resetForm')->with([
            'message'=> '',
            'email' => $request->email,
            'reset_hash' => $request->reset_hash,
        ]);
    }
}
