<?php

namespace App\Http\Controllers\admin;

use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at','DESC')->
                    with('product_images')
                    ->get();
        return response()->json([
            'status' => 200,
            'products' => $products
        ],200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'price' => 'required',
            'category_id' => 'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->is_featured = $request->is_featured;
        $product->save();
        
        if(!empty($request->gallery))
        {
            foreach($request->gallery as $key => $tempImageId){
                $tempImage = TempImage::find($tempImageId);
                
                $extArray = explode('.',$tempImage->name); 
                $ext = end($extArray);
                $imageName = $product->id.'-'. time().'.'.$ext;
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));
            
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400 , 460);
                $img->save(public_path('uploads/products/small/' . $imageName));

                $productImage = new ProductImage();
                $productImage->image = $imageName;
                $productImage->product_id = $product->id;
                $productImage->save();

                if($key == 0)
                {
                    $product->image = $imageName;
                    $product->save();
                }
            }

        }

        return response()->json([
            'status' => 200,
            'message' => 'Product has been created successfully'
        ],200);
    }

    public function show($id)
    {
        $product = Product::with('product_images')
                    ->find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ],404);
        }

        return response()->json([
            'status' => 200,
            'data' => $product
        ],200);
    }

    public function update($id, Request $request)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required',
            'category_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // الآن استخدم الـ $product نفسه
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->is_featured = $request->is_featured;

        // استخدام ->save() أو ->update()
        $product->save(); // يمكنك استخدام save بدل update في هذه الحالة
        
        return response()->json([
            'status' => 200,
            'message' => 'Product has been updated successfully'
        ], 200);
    }


    public function destroy($id)
    {
        $product = Product::find($id);

        if($product == null){
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ],404);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product has been deleted successfully'
        ],200);
    }

    public function saveProductImage(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'image' => 'required|image|mimes:jpeg,png,jpg,gif'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        $image = $request->file('image');
        $imageName = $request->product_id.'-'.time().'.'.$image->extension();

        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathName());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));
            
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathName());
        $img->coverDown(400 , 460);
        $img->save(public_path('uploads/products/small/' . $imageName));

        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->id;
        $productImage->save();

        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/'.$imageName));
        $img->coverDown(400,450);
        $img->save();

        return response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded successfully',
            'data' => $productImage
        ],200);
    }

    public function updateDefaultImage(Request $request)
    {
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product default image changed successfully'
        ],200);
    }
}
