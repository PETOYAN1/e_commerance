<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\FavoriteResource;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'unauthorized',
                'message' => 'Unauthorized. Please log in to toggle favorites.'
            ], 401);
        }

        $product_id = $request->input('product_id');

        $favorite = Favorite::where('user_id', $user->id)
            ->where('product_id', $product_id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json([
                'status' => 'unfavorited',
                'message' => 'Product has been removed from favorites'
            ], 200);
        } else {
            Favorite::create([
                'user_id' => $user->id,
                'product_id' => $product_id
            ]);

            return response()->json([
                'status' => 'favorited',
                'message' => 'Product has been added to favorites'
            ]);
        }
    }

    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'unauthorized',
                'message' => 'Unauthorized. Please log in to toggle favorites.'
            ], 401);
        }

        $favorites = Favorite::where('user_id', $user->id)
            ->with('product')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => new FavoriteResource($favorites),
        ], 200);
    }
}
