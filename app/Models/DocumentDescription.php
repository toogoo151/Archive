<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentDescription extends Model
{
    use HasFactory;
    protected $table = 'pko_doc_description';
    public $timestamps = false;
}
