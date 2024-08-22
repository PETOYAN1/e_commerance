<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SearchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'id'=> $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'rating' => $this->rating,
            'price'=> $this->price,
            'images' => ImageResource::collection($this->images) ?? null,
            'category' => $this->category->name ?? null,
            'brand' => $this->brand->b_name ?? null,
            'dis_count' => $this->discounts->percent ?? null,
        ];;
    }
}
