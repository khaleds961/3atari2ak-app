<?php

namespace App\Http\Controllers;

use App\Models\Userss;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = Userss::create([
             'firstname' => $request->firstname,
             'lastname' => $request->lastname,
             'picture' => $request->picture,
             'email'    => $request->email,
             'password' => $request->password,
             'isAdmin' =>$request->isAdmin
         ]);

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }


    
    public function uploadImage(Request $request ){
        $user = new Userss();
        $user->fill($request->all());
        if($picture = $request->file('picture')){
            $picture = $request->picture;
            $picture ->store('public/user_images/');
            $user->picture = $picture->hashName();
        }
        if($user->save()){
            return response()->json(
                ['success'=>true,
                'users'=>$user]
            );}
            else{
                return response()->json(
                    ['success'=>false,
                    'users'=>'error']
                );
            }
    }
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $email= $request->email;


        $arr= Userss::where('email', $email)
                         ->get();
    
    
        return [
                            $this->respondWithToken($token),
                          $arr
                        ];
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ]);
    }
}
