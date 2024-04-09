<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RankType extends Model
{
    use HasFactory;
    protected $table = 'tb_rank_type';
    public $timestamps = false;
}
