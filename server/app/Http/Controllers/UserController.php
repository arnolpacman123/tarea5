<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);
        $user = User::create(
            [
                'name' => $fields['name'],
                'gender' => $fields['gender'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
                'phone' => $request->input('phone'),
                'address' => $request->input('address'),
            ],
        );

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !\Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad creds'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $cookie = cookie('jwt', $token, 60 * 24);

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201)->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = \Auth::user();
        $user->tokens()->delete();
        $cookie = \Cookie::forget('jwt');

        return [
            'message' => 'Logged out'
        ];
    }

    public function user(Request $request)
    {
        $user = $request->user();
        
        return new UserResource($user);
    }
}
