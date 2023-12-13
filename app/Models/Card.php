<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    /**
     * I specify 'front', 'imgUrl', and 'back' as fillable fields of the model.
     */
    protected $fillable = [
        'front',
        'imgUrl',
        'back',
    ];

    /**
     * I specify 'createdAt', and 'updatedAt' as hidden fields of the model.
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * I specify a method called deck which creates a many to one relationship
     * to the Deck Model.
     */
    public function deck(){
        return $this->belongsTo(Deck::class);
    }
}
