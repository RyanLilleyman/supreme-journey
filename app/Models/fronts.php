<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fronts extends Model
{
    use HasFactory;
    protected $fillable = [
        'front_url',
    ];



    public function session(){
        return $this->belongsTo(session::class);
    }
}
