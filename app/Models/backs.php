<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class backs extends Model
{
    use HasFactory;

    // I specified back_url as a fillable field in the model.
    protected $fillable = [
        'back_url',
    ];


    /**
     * I specify a one to many relationship with the session model class.
     */
    public function session(){
        return $this->belongsTo(session::class);
    }
}
