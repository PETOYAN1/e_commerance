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
                ->inRandomOrder();
                
            $perPage = 20;
            $page = $request->input("page", 1);
            
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
            
            foreach ($imageFile as $image) {
                if (!$image->isValid()) {
                    return response()->json([
                        'message' => 'One or more images are invalid',
                    ], 400);
                }
            }

            if (count($imageFile) > 8) {
                return response()->json([
                    'code' => 400,
                    'message' => "You can upload a maximum of 8 images"
                ], 400);
            }
    
            $product = new Product();
            $product->name = $validData['name'];
            $product->description = $validData['description'];
            $product->price = $validData['price'];
            $product->rating = $validData['rating'];
            $product->brand_id = $validData['brand_id'];
            $product->slug = Str::slug($product->name, '-');
            $product->vendor_code = $this->generateUniqueVendorCode();
            $product->category_id = $validData['category_id'];
            $product->save();
    
            foreach ($imageFile as $image) {
                if ($image->isValid()) {
                    $imageName = $this->generateUniqueImageName($image);
                    $path = "product_images/";
                    Storage::disk('public')->put($path . $imageName, file_get_contents($image));
    
                    $imageData[] = [
                        'product_id' => $product->id,
                        'image' => $path . $imageName,
                    ];
                } else {
                    return response()->json([
                        'code' => 400,
                        'message' => 'Invalid image file'
                    ], 400);
                }
            }
    
            Images::insert($imageData);
    
            return response()->json([
                'code' => 201,
                'message' => 'Product created successfully',
                'data' => new ProductResource($product)
            ], 201);
        } catch (Exception $e) {
            // Clean up any images that were uploaded if there's an error
            foreach ($imageData as $image) {
                Storage::disk('public')->delete($image['image']);
            }
    
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    private function generateUniqueVendorCode()
    {
        do {
            $vendorCode = random_int(1000000000, 9999999999);
        } while (Product::where('vendor_code', $vendorCode)->exists());
    
        return $vendorCode;
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

            $similarProducts = Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->with('category', 'discount', 'Images', 'brand', 'productEntry')
                ->limit(10)
                ->get();

            if (!$product) {
                return response()->noContent();
            }

            return response()->json([
                'code' => 200,
                'data' =>  new ProductResource($product),
                'recommended' => ProductResource::collection($similarProducts)
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
            $productWithDetails->rating = $validData['rating']; 
            $productWithDetails->brand_id = $validData['brand_id'];
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
