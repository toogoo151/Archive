<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserQuestionHistory extends Model
{
    use HasFactory;
    protected $table = 'pko_user_question_history';
    public $timestamps = false;
}
