<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;
    protected $fillable = [
        'departure','destination','day','leavingtime','note','avseats','userid','currentlocation'
    ];
}
