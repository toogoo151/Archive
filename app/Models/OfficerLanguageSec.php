<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficerLanguageSec extends Model
{
    use HasFactory;

    protected $table = 'pko_officer_languagesec';

    protected $fillable = [

        'missionID', 'eeljID', 'genderID', 'readCol', 'writeCol', 'listenCol', 'speakCol', 'totalScore', 'alcpt', 'languageEdit', 'successful', 'admin_id', 'admin_name', 'admin_email', 'adminRD', 'objectName', 'objectmail', 'objectRD', 'user_ip',
    ];
    protected $guarded = ['id'];

    public $timestamps = true;
}
