<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ride;
use Carbon\Carbon;


class RideController extends Controller
{
    public function addride(request $request)
    {
        $ride = new Ride;
        try {
            $ride->fill($request->all());
            $ride->save();
            if ($ride) {
                return [
                    'success' => true,
                ];
            }
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function getrideswithoutmine($id)
    {
        $arr= Ride::join('userss', 'userss.id', '=', 'userid')
      
        ->whereNotIn('userid', [$id])
        ->where('rides.day', '>=', Carbon::today())
        ->orderBy('day','DESC')
        ->get(['rides.id as ride_id','rides.created_at as date', 'userss.*', 'rides.*']);
         
        return $arr;
    }

    public function getridebyuser($id)
    {
        return Ride::join('userss', 'userss.id', '=', 'userid')
        ->where('userid', [$id])
        ->get(['rides.id as ride_id','rides.*','userss.*']);
    }

    public function getridebyid($id)
    {
        return Ride::where('id', $id)->get();
    }

    public function editride(request $request, $id)
    {
        try {
            if (self::getridebyid($id)) {
                $ride = Ride::where('id', $id)->first();
                $ride->update($request->all());
                return $ride;
            } else {
                return 'Wrong Id';
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    public function deleteride($id)
    {
        try {
            $result=Ride::where('id', $id)->delete();
            if ($result) {
                return [
                    'success' => true,
                    'message'=>'Ride Deleted !!'
                ];
            } else {
                return [
                    'success' => false,
                    'message'=>'Ride Doesn\'t Exist !!!'
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
