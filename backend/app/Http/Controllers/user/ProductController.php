<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function latestProducts()
    {
        $products = Product::orderBy('created_at','DESC')
        ->limit(4)->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ],200);
    }

    public function featuredProducts()
    {
        $products = Product::orderBy('created_at','DESC')
            ->where('is_featured','yes')->limit(4)->get();
            return response()->json([
                'status' => 200,
                'data' => $products
            ],200);
    }

    public function getCategories()
    {
        $categories = Category::orderBy('name','ASC')->where('status',1)
                      ->get();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ],200);  
    }

    public function getProducts(Request $request)
    {
        $products = Product::orderBy('created_at','DESC')
                    ->limit(8)
                    ->get();

        if(!empty($request -> category))
        {
            $catArray = explode(',',$request->category);
            $products = $products->whereIn('category_id',$catArray);
        }

        return response()->json([
            'status' => 200,
            'data' => $products
        ],200);
    }

    
}
