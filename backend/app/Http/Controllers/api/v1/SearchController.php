<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SearchResource;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        try {
            $search = $request->input('search');
            $autocomplete = $request->input('autocomplete', false);
            $limit = $request->input('limit', 10);
            $offset = $request->input('offset', 0);
            $searchTerm = $autocomplete ? $autocomplete : $search;

            $query = Product::with([
                'category',
                'discount',
                'images',
                'brand'
            ])->where(function ($query) use ($searchTerm) {
                $query->where('name', 'LIKE', "%$searchTerm%")
                    ->orWhere('description', 'LIKE', "%$searchTerm%");
            })
                ->orWhereHas('category', function ($query) use ($searchTerm) {
                    $query->where('name', 'LIKE', "%$searchTerm%");
                })
                ->orWhereHas('brand', function ($query) use ($searchTerm) {
                    $query->where('b_name', 'LIKE', "%$searchTerm%");
                });

            if ($autocomplete) {
                $query->limit(7);
            } else {
                $query->offset($offset)
                    ->limit($limit);
            }

            $products = $query->get();
            $total = $query->count();

            return response()->json([
                'code' => 200,
                'total' => $total,
                'data' => SearchResource::collection($products)
            ]);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
