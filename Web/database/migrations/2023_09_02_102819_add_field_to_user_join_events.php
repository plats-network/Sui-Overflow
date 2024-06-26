<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_join_events', function (Blueprint $table) {
            $table->tinyInteger('type')->default(0)->comment('0: Session, 1: Booth');
            $table->boolean('is_code')->default(false)->comment('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_join_events', function (Blueprint $table) {
            //
        });
    }
};
