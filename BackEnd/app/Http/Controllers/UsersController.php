<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Userss;

class UsersController extends Controller
{
    public function adduser(request $request)
    {
        $users = new Userss;
        try {
            $users->fill($request->all());
            $users->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
    
    public function getusers()
    {
        return Userss::all();
    }

    public function getuserbyid($id)
    {
        return Userss::where('id', $id)->get();
    }
    
    public function edituser(request $request, $id)
    {
             try{
             if (self::getuserbyid($id)) {
                 $users = Userss::where('id', $id)->first();
                 $users->update($request->all());
             } else {
                 return 'Wrong Id';
             }
         }
         catch(Exception $e){
             return $e;
         
         }
       
    }

    public function deleteuser($id)
    {
        try {
            $result=Userss::where('id', $id)->delete();
            if ($result) {
                return [
                    'success' => true,
                    'message'=>'User Deleted !!'
                ];
            } else {
                return [
                    'success' => false,
                    'message'=>'User Doesn\'t Exist !!!'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message'=>'Inable to delete'
            ];
        }
    }
}
