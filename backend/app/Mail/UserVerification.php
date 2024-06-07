<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class UserVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $verificationUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
        $this->verificationUrl = URL::temporarySignedRoute(
            'api.v1.verification.verify', now()->addMinutes(60), ['id' => $user->id]
        );
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('User Verification')
                    ->view('emails.verification')
                    ->with([
                        'name' => $this->user->name,
                        'verificationUrl' => $this->verificationUrl,
                    ]);
    }
}
