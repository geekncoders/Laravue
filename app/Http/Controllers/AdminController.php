<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;

class AdminController extends Controller
{
    public function allTags(){
        return Tag::latest()->get();
    }
    
    public function addTag(Request $request){
        $validate = $request->validate([
            'tagName' => 'required|min:5',
        ]);

        $tagname = new Tag;
        $tagname->tagName = $request->tagName;
        if($tagname->save()){
            return $tagname;
        }

        // return Tag::create([
        //     'tagName' => $request->tagName
        // ]);
    }

    public function editTag(Request $request){
        $validate = $request->validate([
            'tagName' => 'required|min:5',
        ]);

        $editTag = Tag::where('id', $request->id)->first();
        $editTag->tagName = $request->tagName;
        if($editTag->save()){
            return $editTag->tagName;
        }
    }

    public function deleteTag(Request $request){
        $validate = $request->validate([
            'id' => 'required'
        ]);

        $deleteTag = Tag::where('id', $request->id)->first();
        return $deleteTag->delete();
    }
}
