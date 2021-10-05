<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRidesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rides', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('departure');
            $table->string('destination');
            $table->date('day')->format('Y-m-d', false);
            $table->string('leavingtime');
            $table->string('note');
            $table->integer('avseats');
            $table->foreignId('userid')->nullable()->references('id')->on('userss')->onDelete('cascade');
            $table->string('currentlocation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rides');
    }
}
