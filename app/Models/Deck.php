<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Deck extends Model
{
    use HasFactory;


    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot(){
        parent::boot();

        static::creating(function ($deck) {
            if(empty($deck->id || $deck->id === 0)){
                $deck->id = (string) Str::uuid();
            }
        });
    }

    protected $fillable = [
        'name',
    ];

    protected $guarded = [
        'id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];


    public function cards(){
        return $this->hasMany(Card::class);
    }
}
