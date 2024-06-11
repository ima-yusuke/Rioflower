<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function ShowLink()
    {
        return view('dash-link');
    }
}
