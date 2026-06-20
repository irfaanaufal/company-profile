<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'company_name',
        'logo',
        'about_image',
        'about',
        'address',
        'phone',
        'email',
    ];
}
