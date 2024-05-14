<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Images;
use App\Models\Product;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        try {
            $query = Product::query()->with(['category', 'discount', 'Images']);
            $perPage = 5;
            $page = $request->input("page", 1);
            $search = $request->input("search");

            if ($search) {
                $query->where("name", "LIKE", '%' . $search . '%');
            }
            $total = $query->count();

            $result = $query
                ->offset(($page - 1) * $perPage)
                ->limit($perPage)
                ->get();

            return response()->json([
                'code' => 200,
                'current_page' => $page,
                'last_page' => ceil($total / $perPage),
                'data' => ProductResource::collection($result)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function store(ProductRequest $request)
    {
        try {
            $validData = $request->validated();
            $imageData = [];

            $imageFile = $validData['images'];

            $product = new Product();
            $product->name = $validData['name'];
            $product->description = $validData['description'];
            $product->price = $validData['price'];
            $product->slug = Str::slug($product->name, '-');
            $product->category_id = $validData['category_id'];


            if (count($imageFile) > 8) {
                return response()->json([
                    'message' => "You can upload a maximum of 8 images"
                ], 400);
            }


            foreach ($imageFile as $image) {
                $product->save();
                $imageName = $this->generateUniqueImageName($image);
                $path = "product_images/";
                Storage::disk('public')->put($path . $imageName, file_get_contents($image));

                $imageData[] = [
                    'product_id' => $product->id,
                    'image' => $path . $imageName,
                    'created_at' => now()
                ];
            }

            Images::insert($imageData);

            return response()->json([
                'code' => 201,
                'message' => 'Product created successfully',
                'data' => new ProductResource($product)
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ]);
        }
    }



    private function generateUniqueImageName($image)
    {
        $imageName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $image->getClientOriginalName());

        return $imageName;
    }

    public function show(Product $product)
    {
        try {
            $product = Product::with('category', 'discount', 'Images')->find($product->id);

            if (!$product) {
                return response()->json([
                    'code' => 404,
                    'message' => 'No content',
                ], 404);
            }

            return response()->json([
                'code' => 200,
                'data' => new ProductResource($product)
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


function update () {

}