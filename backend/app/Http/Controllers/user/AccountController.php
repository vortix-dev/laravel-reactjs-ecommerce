<?php

namespace App\Http\Controllers\user;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ];

        $validator = Validator::make($request->all(),$rules);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'user';
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'You have registred'
        ],200);
    }

    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = User::find(Auth::user()->id);
            if($user->role == 'user' ){
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id' =>$user->id,
                    'name' => $user->name
                ],200);
            }else{
                return response()->json([
                    'status' => 401,
                    'message' => 'You are not authorized to access admin panel'
                ],401);
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Either email/password is incorrect'
            ],401);
        }
    }

    public function getOrderDetail($id , Request $request)  
    {
        $order = Order::where('user_id', $request->user()->id)
              ->where('id', $id)
              ->with('items')
              ->first();

        if($order == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found',
                'data' => []
            ],404);
        }else{
            return response()->json([
                'status' => 200,
                'data' => $order
            ],200);
        }
    }

    public function orders(Request $request)
    {
        $orders = Order::where('user_id',$request->user()->id)->get();
        
        return response()->json([
            'status' => 200,
            'data' => $orders
        ],200);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 422, 'errors' => $validator->errors()], 422);
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['status' => 200, 'message' => 'Profile updated successfully.']);
    }
}
