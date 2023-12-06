<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class backs extends Model
{
    use HasFactory;
    protected $fillable = [
        'back_url',
    ];


    public function session(){
        return $this->belongsTo(session::class);
    }
}
