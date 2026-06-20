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
        Schema::table('carousels', function (Blueprint $table) {
            $table->integer('position')->default(0)->after('is_active');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->integer('position')->default(0)->after('composition');
        });
        Schema::table('partnerships', function (Blueprint $table) {
            $table->integer('position')->default(0)->after('description');
        });
        Schema::table('certifications', function (Blueprint $table) {
            $table->integer('position')->default(0)->after('description');
        });

        // Initialize position values to id so existing records maintain order
        Illuminate\Support\Facades\DB::statement('UPDATE carousels SET position = id');
        Illuminate\Support\Facades\DB::statement('UPDATE products SET position = id');
        Illuminate\Support\Facades\DB::statement('UPDATE partnerships SET position = id');
        Illuminate\Support\Facades\DB::statement('UPDATE certifications SET position = id');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carousels', function (Blueprint $table) {
            $table->dropColumn('position');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('position');
        });
        Schema::table('partnerships', function (Blueprint $table) {
            $table->dropColumn('position');
        });
        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn('position');
        });
    }
};
