<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RankParent extends Model
{
    use HasFactory;
    protected $table = 'tb_rank_parent';
    public $timestamps = false;
}
