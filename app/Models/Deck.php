<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Deck extends Model
{
    use HasFactory;

    // Specifies the primary uuid as non incrementable.
    public $incrementing = false;

    // Specifies the primary uuid as a string.
    protected $keyType = 'string';


    protected static function boot(){
        parent::boot();

        /**
         * [29] “Boot Method Dependency Injection,” Laravel, https://laravel.com/docs/10.x/providers#boot-method-dependency-injection (accessed Dec. 13, 2023).
         * I wrote this method to specifically check if the current deck has
         * a uuid and or if it is zero. If so, it sets the current $deck->id to a newly generated uuid
         * using the Str::uuid() static method inherent to laravel.
         *
         * This method on creation of the deck model ensures that noone can modify the deck id from outside the class.
         * It ensures the uuid is created on boot or instantiation of the new deck.
         */
        static::creating(function ($deck) {
            if(empty($deck->id || $deck->id === 0)){
                $deck->id = (string) Str::uuid();
            }
        });
    }

    /**
     * I specify the name as mass assignable.
     */
    protected $fillable = [
        'name',
    ];

    /**
     * I wanted to keep the uuid protected from being overwritten inside any requests and responses.
     * Thus, I keep it hidden from mass assignment.
     */
    protected $guarded = [
        'id',
    ];

    /**
     * I specify which model attributes to keep hidden from the user.
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * I specify a one to many relationship with the Card Model.
     */
    public function cards(){
        return $this->hasMany(Card::class);
    }
}
