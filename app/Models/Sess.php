<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sess extends Model
{
    use HasFactory;

    protected $table = 'sessions';

    protected $fillable = [
        'session_url',
        'session_timer',
        'round_timer',
        'show_session_timer',
        'show_round_timer',
    ];
    protected $guarded = [
        'id'
    ];

    public function fronts(){
        return $this->hasMany(fronts::class);
    }

    public function backs(){
        return $this->hasMany(backs::class);
    }
}
