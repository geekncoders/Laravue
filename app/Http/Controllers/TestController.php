<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(){
        // return 'some text here';
        return response()->json([
            'msg' => 'Some error occured'
        ], 422);
    }
}
