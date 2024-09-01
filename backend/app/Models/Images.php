<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Images extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'product_id',
    ];

    public function Product()
    {
        return $this->hasMany(Product::class);
    }

    public static function upload($images, $product_id = null)
    {
        $saveImages = [];

        foreach ($images as $image) {
            $imageName = self::generateUniqueImageName($image);
            $path = "product_images/";
            Storage::disk('public')->put($path . $imageName, file_get_contents($image));

            $saveImages[] = [
                'image' => $path . $imageName,
                'product_id' => $product_id
            ];
        }

        return $saveImages;
    }

    public static function removeImages(array $imageIds) {
        $images = self::whereIn('id', $imageIds)->get();

        foreach ($images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }
    }

    private static function generateUniqueImageName($image)
    {
        $imageName = time() . '_' . Str::random(10) . '_' . str_replace(' ', '_', $image->getClientOriginalName());

        return $imageName;
    }
}
