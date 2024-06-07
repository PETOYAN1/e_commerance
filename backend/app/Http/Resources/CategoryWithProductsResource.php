<?php

namespace App\Http\Resources;

use Hashids;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryWithProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'picture' => asset('storage/' . $this->picture),
            'products_count' => $this->products_count,
            'products' => ProductResource::collection($this->products) ?? null,
            'created_at' => $this->created_at->format('d-m-Y')
        ];
    }

    // private function hashId(int $id): string
    // {
    //     return Hashids::encode($id);
    // }
}
