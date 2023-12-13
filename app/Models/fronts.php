<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fronts extends Model
{
    use HasFactory;

    /**
     * I specify the front_url references as mass assignable.
     */
    protected $fillable = [
        'front_url',
    ];


    /**
     * I specify a many to one relationship with the session model.
     */
    public function session(){
        return $this->belongsTo(session::class);
    }
}
