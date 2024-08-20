<?php

namespace App\Console\Commands;

use App\Models\Currency;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateExchangeRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-exchange-rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update currency exchange rates';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiKey = config('services.exchange_rate.api_key');
        $baseCurrency = 'USD'; 
        $url = "https://v6.exchangerate-api.com/v6/{$apiKey}/latest/{$baseCurrency}";
    
        $response = Http::withoutVerifying()->get($url);
    
        if ($response->successful()) {
            $responseBody = $response->json();
    
            if (isset($responseBody['conversion_rates'])) {
                $rates = $responseBody['conversion_rates'];
    
                foreach ($rates as $code => $rate) {
                    Currency::updateOrCreate(
                        ['code' => $code],
                        ['exchange_rate' => $rate]
                    );
                }
    
                $this->info('Exchange rates updated successfully.');
            } else {
                $this->error('The "rates" key does not exist in the API response.');
            }
        } else {
            $this->error('Failed to update exchange rates.');
        }
    }
    
}
