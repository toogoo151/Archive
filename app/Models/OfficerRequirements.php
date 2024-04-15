<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficerRequirements extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_requirements';
    public $timestamps = false;
}
