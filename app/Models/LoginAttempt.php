<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginAttempt extends Model
{
      protected $fillable = [
        // Other attributes...
        'email', 'successful','user_ip',
    ];
    public $timestamps = true;
}
