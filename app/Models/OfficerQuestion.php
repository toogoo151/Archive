<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficerQuestion extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_question';
    public $timestamps = false;
}
