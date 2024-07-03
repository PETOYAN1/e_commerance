<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserVerification;
use App\Models\User;


class TestController extends Controller
{
    public function sendTestEmail()
    {
        $user = User::first(); 
        
        Mail::to($user->email)->send(new UserVerification($user));

        return 'Test email sent';
    }
}
