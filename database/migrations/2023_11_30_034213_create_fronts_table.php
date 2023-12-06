<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fronts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sess_id');
            $table->string('front_url');
            $table->timestamps();

            $table->foreign('sess_id')->references('id')->on('sessions')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fronts');
    }
};
