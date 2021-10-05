<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Reviews;



class ReviewsController extends Controller
{
    public function addreview(request $request)
    {
        $review = new Reviews;
        try {
            $review->fill($request->all());
            $review->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
    
    public function getreviews(){
        return Reviews::all();
    }

    public function getreviewbyid($id)
    {
        return Reviews::where('id', $id)->get();
    }
    
    public function editreview(request $request, $id)
    {
        try{
        if (self::getreviewbyid($id)) {
            $review = Reviews::where('id', $id)->first();
            $review->update($request->all());
        } else {
            return 'Wrong Id';
        }
    }
    catch(Exception $e){
        return $e;
    }

    }

    public function deletereview($id){
        try{
            $review=Reviews::where('id', $id)->delete();
            if($review){
                return [
                    'success' => true,
                    'message'=>'Review Deleted !!'
                ]; 
            }
            else{
                return [
                    'success' => false,
                    'message'=>'Review Id Doesn\'t Exist !!!'
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
