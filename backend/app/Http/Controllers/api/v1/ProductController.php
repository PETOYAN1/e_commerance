<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
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
            $query = Product::query()
                ->with(['category', 'discount', 'Images', 'brand', 'productEntry.size', 'productEntry.color', 'productEntry.material'])
                ->orderByDesc('id');
            $perPage = 10;
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

            if (count($imageFile) > 8) {
                return response()->json([
                    'message' => "You can upload a maximum of 8 images"
                ], 400);
            }

            if ($imageFile) {
                $product = new Product();
                $product->name = $validData['name'];
                $product->description = $validData['description'];
                $product->price = $validData['price'];
                $product->slug = Str::slug($product->name, '-');
                $product->category_id = $validData['category_id'];
                $product->save();

                foreach ($imageFile as $image) {
                    $imageName = $this->generateUniqueImageName($image);
                    $path = "product_images/";
                    Storage::disk('public')->put($path . $imageName, file_get_contents($image));

                    $imageData[] = [
                        'product_id' => $product->id,
                        'image' => $path . $imageName,
                    ];
                }

                Images::insert($imageData);

                return response()->json([
                    'code' => 201,
                    'message' => 'Product created successfully',
                    'data' => new ProductResource($product)
                ], 201);
            } else {
                foreach ($imageData as $image) {
                    Storage::disk('public')->delete($image['image']);
                }
                return response()->json([
                    'code' => 500,
                    'message' => 'Internal Server Error: Failed to save product',
                ]);
            }
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

            $product = Product::with('category', 'discount', 'Images', 'brand', 'productEntry')
                ->find($product->id);

            if (!$product) {
                return response()->noContent();
            }

            if (!$product) {
                return response()->json([
                    'code' => 404,
                    'message' => 'No content',
                ], 404);
            }

            return response()->json([
                'code' => 200,
                'data' =>  new ProductResource($product)
            ]);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $productWithDetails = Product::with('category', 'discount', 'Images')->findOrFail($product->id);
            $validData = $request->validated();
            $productWithDetails->name = $validData['name'];
            $productWithDetails->description = $validData['description'];
            $productWithDetails->price = $validData['price'];
            $productWithDetails->slug = Str::slug($productWithDetails->name, '-');
            $productWithDetails->category_id = $validData['category_id'];
            $productWithDetails->discount_id = $validData['discount_id'];

            if ($request->has('images')) {
                foreach ($request->images as $imageId => $newImageData) {
                    $image = Images::find($imageId);
                    if ($image) {
                        $image->update(['image' => $newImageData]);
                    }
                }
            }
            $productWithDetails->save();


            return response()->json([
                'code' => 200,
                'message' => 'Product updated successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function destroy(Product $product)
    {
        try {
            $productWithDetails =
                Product::with('category', 'discount', 'Images', 'brand', 'productEntry.size', 'productEntry.color', 'productEntry.material')->findOrFail($product->id);

            foreach ($productWithDetails->images as $image) {
                Storage::disk('public')->delete($image->image);
            }

            $productWithDetails->images()->delete();

            $productWithDetails->delete();

            return response()->noContent();
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
