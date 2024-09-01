<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryWithProductsResource;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit = $request->limit;
            $categoryWithProducts = Category::with('children')->whereNull('parent_id')
            ->limit(10)->offset($limit)
            ->get();

            if ($categoryWithProducts) {
                return response()->json([
                    'code' => 200,
                    'data' =>  CategoryResource::collection($categoryWithProducts)
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


    public function store(CategoryRequest $request)
    {
        try {
            $validData = $request->validated();
            $picture = $validData['picture'];
            $category = new Category();
            $category->name = $validData['name'];
            $category->slug =  Str::slug($category->name, '-');
            $category->description = $validData['description'];
    
            $pictureName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $picture->getClientOriginalName());
            $path = "category_images/";
            Storage::disk('public')->put($path . $pictureName, file_get_contents($picture));
            $category->picture = $path . $pictureName;
    
            $category->save();
    
            return response()->json([
                'code' => 201,
                'message' => 'Category created successfully',
                'data' => new CategoryResource($category)
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    public function show(string $id)
    {
        try {
            $category = Category::withCount("Products")->find($id);
    
            if (!$category) {
                return response()->json(['message' => 'Category not found'], 404);
            }
        
            return response()->json([
                'data' => new CategoryWithProductsResource($category)
            ]);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function update(CategoryRequest $request, Category $category)
    {
        try {            
            $category = Category::findOrFail($category->id);
            $validData = $request->validated();
    
            $category->name = $validData['name'];
            $category->description = $validData['description'];
            
            if ($category->picture && $request->has('picture')) {
                Storage::disk('public')->delete($category->picture);
            }

            if ($request->has('picture')) {
                $picture = $validData['picture'];
                $pictureName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $picture->getClientOriginalName());
                $path = "category_images/";
                Storage::disk('public')->put($path . $pictureName, file_get_contents($picture));
                $category->picture = $path . $pictureName;
            }

            $category->update();
            
            return response()->json([
                'code' => 204,
                'message' => 'Category updated successfully',
            ], 204);
        } catch (Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }

    }


    public function destroy(Category $category)
    {
        try {
            $category = Category::find($category->id);

            if (!$category) {
                return response()->json(['message' => 'Category not found'], 404);
            } 
            Storage::disk('public')->delete($category->picture);
            $category->delete();
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
