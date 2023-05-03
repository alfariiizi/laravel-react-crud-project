<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],

            // Harus dalam bentuk Hash, dikarenakan Auth::attempt() akan mencari password dalam bentuk Hash nya
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $request_cred = $request->validated();

        // Jadi, ketika di Model "User" nya berisi fillable: name, email, dan password. Maka Auth::attempt() akan mencari bersarkan fillable tersebut.
        // Jika terdapat kekosongan (misal, name nya kosong), maka akan otomatis 'false'
        $credentials = [
            'name' => User::select('name')->where('email', $request_cred['email'])->get()->first()['name'],
            'email' => $request_cred['email'],
            'password' => $request_cred['password']
        ];

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password is incorrect',

                //// IT IS FOR BUG TESTING
                // 'credentials' => $credentials,
                // 'auth3' => Auth::validate($credentials),
                // 'user' => Auth::user(),
                // 'hash' => Hash::make($credentials['password']),
                // 'auth4' => Auth::attempt(['email' => $credentials['email'], 'password' => Hash::make($credentials['password'])]),
                // 'username' => User::select('name')->where('email', $credentials['email'])->get()->first()['name']
                // 'auth' => Auth::attempt($credentials),
                // 'auth2' => Auth::attempt([
                //     'email' => $credentials['email'],
                //     'password' => $credentials['password']
                // ])
            ]);
        }

        /** @var User user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}