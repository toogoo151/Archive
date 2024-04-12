<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\all_users;
use App\Models\DocumentDescription;
use App\Models\DocumentItem;
use App\Models\MainHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DocumentOfficerBackController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }


}
