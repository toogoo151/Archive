<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class log_users extends Model
{
    use HasFactory;
    protected $table = 'pko_userSec';
    public $timestamps = true;
}
