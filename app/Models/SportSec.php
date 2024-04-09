<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SportSec extends Model
{
      protected $fillable = [

        'missionID', 'eeljID', 'pkoMainHistoryID','sportType1','sportType2', 'sportType3', 'sportType4' ,'averageScore', 'sportEdit', 'sportEditDes', 'successful','admin_id','admin_email','admin_name', 'adminRD','objectName','objectmail','objectRD','user_ip','sportEdit','genderID',
    ];
        protected $guarded = ['id', 'created_at', 'updated_at'];

    public $timestamps = true;
}
