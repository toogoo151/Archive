<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Successful login, store the login details
            $user = Auth::user();
            $this->storeLoginDetails($user->id, $request->ip());

            return response()->json(['message' => 'Login successful']);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    private function storeLoginDetails($userId, $ipAddress)
    {
        // Store the login details in your database
        // You can create a "logins" table with columns like "user_id", "timestamp", "ip_address", etc.
    }
}
