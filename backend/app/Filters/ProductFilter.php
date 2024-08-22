<?php
namespace App\Filters;

class ProductFilter extends QueryFilter {
    public function category_id($ids = null) {
        return $this->builder->when($ids, function($query) use($ids) {
            $query->whereIn('category_id', explode(',', $ids));
        });
    }

    public function brand_id($id = null) {
        return $this->builder->when($id, function ($query) use($id){
            $query->where('brand_id', $id);
        }); 
    }

    public function color_id($ids = null) {
        return $this->builder->when($ids, function ($query) use ($ids) {
            $query->whereIn('brand_id', explode(',', $ids));
        });
    }
    
    public function min_price($price = null) {
        return $this->builder->where('price', '>=', $price);
    }

    public function max_price($price = null) {
        return $this->builder->where('price', '<=', $price);
    }

    public function search($search_string = '') {
        return $this->builder->where('name', 'LIKE', "%$search_string%")
        ->orWhere('description', 'LIKE', "%$search_string%")
        ->orWhere('vendor_code', 'LIKE', "%$search_string%");
    }

    public function autocomplete($search_value) {
        return $this->builder->orderByRaw("CASE 
            WHEN name LIKE ? THEN 1 
            WHEN description LIKE ? THEN 2 
            ELSE 3 
            END", ["$search_value%", "$search_value%"])
        ->limit(7);
    }

    public function sort_by($sortOption = null) {
        return $this->builder->when($sortOption, function ($query) use ($sortOption) {
            switch ($sortOption) {
                case 'lowest_price': 
                    $query->orderBy('price', 'asc');
                    break;
                case 'highest_price':
                    $query->orderBy('price', 'desc');
                    break;
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                default:
                    break;
            }
        });
    }
}