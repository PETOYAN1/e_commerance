<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class FilterProductController extends Controller
{
    public function index(Request $request)
    {

        try {
            $query = Product::query()->with(['category', 'discount', 'Images', 'brand', 'productEntry.size', 'productEntry.color', 'productEntry.material'])->orderByDesc('id');

            $prices = $query->pluck('price');
            $minPrice = $prices->min();
            $maxPrice = $prices->max();
    

            if ($request->has('category_id') && !empty($request->category_id)) {
                $query->where('category_id', $request->category_id);
            }

            if ($request->has('brand_id') && !empty($request->brand_id)) {
                $query->where('brand_id', $request->brand_id);
            }

            if ($request->has('color_id') && !empty($request->color_id)) {
                $query->whereHas('productEntry.color', function ($q) use ($request) {
                    $q->where('id', $request->color_id);
                });
            }

            if ($request->has('min_price') && !empty($request->min_price)) {
                $query->where('price', '>=', $request->min_price);
            }

            if ($request->has('max_price') && !empty($request->max_price)) {
                $query->where('price', '<=', $request->max_price);
            }

            $perPage = $request->input('per_page', 10);
            $page = $request->input('page', 1);

            $total = $query->count();

            $result = $query->offset(($page - 1) * $perPage)->limit($perPage)->get();

            return response()->json([
                'code' => 200,
                'current_page' => $page,
                'last_page' => ceil($total / $perPage),
                'data' => ProductResource::collection($result),
                'min_price' => $minPrice,
                'max_price' => $maxPrice
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
