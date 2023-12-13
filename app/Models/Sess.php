<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sess extends Model
{
    use HasFactory;

    /**
     * I specify the specific table name.
     */
    protected $table = 'sessions';

    /**
     * I specify mass assignable session settings.
     */
    protected $fillable = [
        'session_url',
        'session_timer',
        'round_timer',
        'show_session_timer',
        'show_round_timer',
    ];

    /**
     * I specify the uuid of the session as not mass assignable.
     */
    protected $guarded = [
        'id'
    ];

    /**
     * A one to many relationship with the fronts model.
     */
    public function fronts(){
        return $this->hasMany(fronts::class);
    }

    /**
     * A one to many relationship with the backs model.
     */
    public function backs(){
        return $this->hasMany(backs::class);
    }
}
