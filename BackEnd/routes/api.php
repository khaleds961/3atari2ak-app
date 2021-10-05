<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


////////////////// User API /////////////////////

Route::post('/adduser', [\App\Http\Controllers\UsersController::class,'adduser']);
Route::get('/getusers', [\App\Http\Controllers\UsersController::class,'getusers']);
Route::get('/getuserbyid/{id}', [\App\Http\Controllers\UsersController::class,'getuserbyid']);
Route::put('/edituser/{id}', [\App\Http\Controllers\UsersController::class,'edituser']);
Route::delete('/deleteuser/{id}', [\App\Http\Controllers\UsersController::class,'deleteuser']);

////////////////// User API /////////////////////



////////////////// Ride API /////////////////////

Route::post('/addride', [\App\Http\Controllers\RideController::class,'addride']);
Route::get('/getrideswithoutmine/{id}', [\App\Http\Controllers\RideController::class,'getrideswithoutmine']);
Route::get('/getridebyuser/{id}', [\App\Http\Controllers\RideController::class,'getridebyuser']);
Route::get('/getridebyid/{id}', [\App\Http\Controllers\RideController::class,'getridebyid']);
Route::put('/editride/{id}', [\App\Http\Controllers\RideController::class,'editride']);
Route::delete('/deleteride/{id}', [\App\Http\Controllers\RideController::class,'deleteride']);


////////////////// Ride API /////////////////////



////////////////// Review API /////////////////////

Route::post('/addreview', [\App\Http\Controllers\ReviewsController::class,'addreview']);
Route::get('/getreviews', [\App\Http\Controllers\ReviewsController::class,'getreviews']);
Route::get('/getreviewbyid/{id}', [\App\Http\Controllers\ReviewsController::class,'getreviewbyid']);
Route::put('/editreview/{id}', [\App\Http\Controllers\ReviewsController::class,'editreview']);
Route::delete('/deletereview/{id}', [\App\Http\Controllers\ReviewsController::class,'deletereview']);

////////////////// Review API /////////////////////



////////////////// Request API /////////////////////

Route::post('/addrequest', [\App\Http\Controllers\RequestController::class,'addrequest']);
Route::get('/getrequests', [\App\Http\Controllers\RequestController::class,'getrequests']);
Route::get('/getrequestbyid/{id}', [\App\Http\Controllers\RequestController::class,'getrequestbyid']);
Route::put('/editrequest/{id}', [\App\Http\Controllers\RequestController::class,'editrequest']);
Route::delete('/deleterequest/{id}', [\App\Http\Controllers\RequestController::class,'deleterequest']);

////////////////// Request API /////////////////////


// authentication routes
Route::post('/auth/register', [\App\Http\Controllers\AuthController::class, 'uploadImage']);
Route::post('/auth/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('/tasks', 'TaskController@index');
    Route::get('/task/{id}', 'TaskController@show');
    Route::post('/task/{id}', 'TaskController@update');
    Route::post('/task', 'TaskController@store');
    Route::delete('/task/{id}', 'TaskController@destroy');
});
