<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CustomerRegistered extends Mailable
{
    use Queueable, SerializesModels;

    public $customers;
    public $products;
    public $details;
    public $words;
    public $links;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($customer, $product, $details, $word, $link)
    {
        $this->customers = $customer;
        $this->products = $product;
        $this->details = $details;
        $this->words = $word;
        $this->links = $link;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('購入リンクのお知らせ')
            ->view('check')
            ->with([
                'name' => $this->customers->name,
                'address' => $this->customers->address,
                'email' => $this->customers->email,
                'product_id' => $this->products->id,
                'product' => $this->products,
                'details' => $this->details,
                'word' => $this->words,
                'link' => $this->links,
            ]);
    }
}
