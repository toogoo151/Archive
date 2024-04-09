<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSportSec extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table__sport_sec', function (Blueprint $table) {
            $table->id();
            $table->string('missionID');
            $table->string('eeljID');
            $table->string('pkoMainHistoryID');
            $table->string('genderID');
            $table->string('sportType1');
            $table->string('sportType2');
            $table->string('sportType3');
            $table->string('sportType4');
            $table->string('averageScore');
            $table->string('sportEdit');
            $table->string('sportEditDes');
            $table->string('successful');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table__sport_sec');
    }
}
