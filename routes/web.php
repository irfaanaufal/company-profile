<?php

use App\Http\Controllers\CarouselController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Models\Carousel;
use App\Models\Certification;
use App\Models\Partnership;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'setting' => Setting::first(),
        'carousels' => Carousel::where('is_active', true)->orderBy('position', 'asc')->get(),
        'products' => Product::orderBy('position', 'asc')->get(),
        'partnerships' => Partnership::orderBy('position', 'asc')->get(),
        'certifications' => Certification::orderBy('position', 'asc')->get(),
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'carousels' => Carousel::count(),
                'products' => Product::count(),
                'partnerships' => Partnership::count(),
                'certifications' => Certification::count(),
            ],
            'setting' => Setting::first(),
        ]);
    })->name('dashboard');

    Route::post('admin/carousell/reorder', [CarouselController::class, 'reorder'])->name('admin.carousell.reorder');
    Route::post('admin/produk/reorder', [ProductController::class, 'reorder'])->name('admin.produk.reorder');
    Route::post('admin/kemitraan/reorder', [PartnershipController::class, 'reorder'])->name('admin.kemitraan.reorder');
    Route::post('admin/sertifikasi/reorder', [CertificationController::class, 'reorder'])->name('admin.sertifikasi.reorder');

    Route::resource('admin/carousell', CarouselController::class)->names('admin.carousell');
    Route::resource('admin/produk', ProductController::class)->names('admin.produk');
    Route::resource('admin/kemitraan', PartnershipController::class)->names('admin.kemitraan');
    Route::resource('admin/sertifikasi', CertificationController::class)->names('admin.sertifikasi');

    Route::post('admin/setting', [SettingController::class, 'update'])->name('admin.setting.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
