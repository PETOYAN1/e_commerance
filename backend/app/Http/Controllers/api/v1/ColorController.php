<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Exception;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index () {
        try {
            $colors = Color::all();


            if ($colors) {
                return response()->json([
                    'code' => 200,
                    'data' =>  ColorResource::collection($colors)
                ], 200);
            } else {
                return response()->noContent();
            }
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
