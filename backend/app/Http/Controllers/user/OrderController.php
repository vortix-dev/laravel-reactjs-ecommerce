<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
{
    try {
        if (!empty($request->cart)) {
            $order = new Order();
            $order->name = $request->name;
            $order->phone = $request->phone;
            $order->address = $request->address;
            $order->wilaya = $request->wilaya;
            $order->grand_total = $request->grand_total;
            $order->status = $request->status ?? 'pending';
            $order->user_id = $request->user()->id; // هنا تأكد أن المستخدم موجود
            $order->save();

            foreach ($request->cart as $item) {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->name = $item['title'];
                $orderItem->price = $item['price'] * $item['qty'];
                $orderItem->unite_price = $item['price'];
                $orderItem->qty = $item['qty'];
                $orderItem->product_id = $item['product_id'];
                $orderItem->save();
            }

            return response()->json([
                'status' => 200,
                'message' => 'You have successfully placed your order'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Your cart is empty'
            ], 404);
        }
    } catch (\Exception $e) {
        // ✅ لإظهار الخطأ في الـ log الخاص بـ Laravel
        \Log::error($e->getMessage());
        
        return response()->json([
            'status' => 500,
            'message' => 'Server Error',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
