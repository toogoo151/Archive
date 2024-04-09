<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequirements extends Model
{
    use HasFactory;
    protected $table = 'pko_user_requirements';
    public $timestamps = false;
}
