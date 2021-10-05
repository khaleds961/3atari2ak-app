<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Requests;



class RequestController extends Controller
{
    public function addrequest(request $request)
    {
        $req = new Requests;
        try {
            $req->fill($request->all());
            $req->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
    
    public function getrequests(){
        return Requests::all();
    }

    public function getrequestbyid($id)
    {
        return Requests::where('id', $id)->get();
    }
    
    public function editrequest(request $request, $id)
    {
        try{
        if (self::getrequestbyid($id)) {
            $req = Requests::where('id', $id)->first();
            $req->update($request->all());
        } else {
            return 'Wrong Id';
        }
    }
    catch(Exception $e){
        return $e;
    }

    }

    public function deleterequest($id){
        try{
            $req=Requests::where('id', $id)->delete();
            if($req){
                return [
                    'success' => true,
                    'message'=>'Request Deleted !!'
                ]; 
            }
            else{
                return [
                    'success' => false,
                    'message'=>'Request Id Doesn\'t Exist !!!'
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
