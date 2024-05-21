<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\LoginAttempt;
use App\Models\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers, ThrottlesLogins;

    protected $maxAttempts = 2;
    protected $decayMinutes = 1;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $successful = Auth::attempt($credentials);

        if ($successful) {
               // Save the login attempt to the database
                LoginAttempt::create([
                    'email' => $request->input('email'),
                    'successful' => "Нэвтэрсэн",
                    'user_ip' => $request->ip(),
                ]);
            return redirect()->intended('home');
        }

        $user = User::where('email', $request->email)->first();

            if ($user) {
                // User exists, so the password must be incorrect
                $error = ['password' => 'Нууц үг буруу.'];
            } else {
                // User does not exist
                $error = ['email' => 'Бүртгэлгүй цахим хаяг байна.'];
            }
        // return redirect()->back()->withInput()->withErrors(['login_error' => 'Дахиад оролдллд үз.']); // Ингэж хийсэн пиздааг алнаа
        return redirect()->back()
        ->withInput($request->only('email'))
        ->withErrors($error);
    }

    public function logout(Request $req)
        {
    $user = $req->user();
    LoginAttempt::create([
        'email' => $user->email,
        'successful' => "Гарсан",
        'user_ip' => $req->ip(),
    ]);
            Auth::logout();
            Auth::guard('web')->logout();
            session()->invalidate();
            session()->regenerateToken();
    //         $credent = $req->only('email', 'password');
    //          $logout = Auth::attempt($credent);
    //           LoginAttempt::updated([
    //             'logout' => "Гарсан",
    // ]);
    //  if ($logout) {
         return redirect('/');
    // }

        }


}
