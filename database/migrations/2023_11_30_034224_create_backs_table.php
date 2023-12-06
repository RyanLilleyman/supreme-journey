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
        Schema::create('backs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sess_id');
            $table->string('back_url');
            $table->timestamps();

            $table->foreign('sess_id')->references('id')->on('sessions')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('backs');
    }
};
