<?php

namespace Database\Seeders;

use App\Models\Carousel;
use App\Models\Certification;
use App\Models\Partnership;
use App\Models\Product;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Admin User
        User::create([
            'name' => 'Admin Sindangasih',
            'username' => 'admin',
            'email' => 'admin@sindangasih.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // 2. Create Default Setting
        Setting::create([
            'company_name' => 'Sindang Asih',
            'logo' => '/images/logo-ptsam.png',
            'about_image' => 'https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=800&q=80',
            'about' => 'PT Sindang Asih Makmur adalah perusahaan terkemuka yang bergerak di bidang penyediaan solusi produk berkualitas tinggi dan kemitraan strategis yang berkelanjutan. Kami berkomitmen untuk selalu memberikan layanan terbaik serta inovasi tiada henti bagi seluruh mitra bisnis dan pelanggan kami di Indonesia.',
            'address' => 'Jl. Raya Sindangasih No. 45, Ciamis, Jawa Barat 46262',
            'phone' => '+6281234567890',
            'email' => 'contact@sindangasih.com',
        ]);

        // 3. Create Default Carousels
        Carousel::create([
            'title' => 'Beras Premium Mutu Terjamin',
            'subtitle' => 'Menghadirkan beras pilihan terbaik dari padi berkualitas hasil petani lokal Indonesia.',
            'image' => 'https://images.unsplash.com/photo-1592997571659-0b21ff64313b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'is_active' => true,
        ]);

        Carousel::create([
            'title' => 'Proses Higienis & Modern',
            'subtitle' => 'Diproduksi menggunakan mesin modern standar tinggi untuk menjaga kebersihan dan kualitas bulir beras.',
            'image' => 'https://plus.unsplash.com/premium_photo-1674019234994-eceabbdd091d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'is_active' => true,
        ]);

        Carousel::create([
            'title' => 'Mitra Kepercayaan Keluarga',
            'subtitle' => 'Menjadi pilihan utama kuliner nusantara, dari meja makan keluarga hingga industri kuliner besar.',
            'image' => 'https://images.unsplash.com/photo-1600738925139-4c4f9e1cc7c8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'is_active' => true,
        ]);

        // 4. Create Default Products
        Product::create([
            'name' => 'Beras Pandan Wangi',
            'slug' => 'beras-pandan-wangi',
            'description' => 'Beras Pandan Wangi Premium adalah beras berkualitas tinggi dengan bulir medium yang pulen dan aroma harum. Pilihan ideal untuk hidangan sehari-hari.',
            'image' => 'https://plus.unsplash.com/premium_photo-1701011134086-a693096c03a4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]);

        Product::create([
            'name' => 'Beras Merah',
            'slug' => 'beras-merah',
            'description' => 'Beras Merah adalah beras berkualitas tinggi dengan bulir medium yang pulen dan aroma harum. Pilihan ideal untuk hidangan sehari-hari.',
            'image' => 'https://images.unsplash.com/photo-1610663711502-35f870cfaea2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]);

        Product::create([
            'name' => 'Beras Nikomaru Premium',
            'slug' => 'beras-nikomaru-premium',
            'description' => 'Beras Nikomaru Premium adalah beras berkualitas tinggi dengan bulir medium yang pulen dan aroma harum. Pilihan ideal untuk hidangan sehari-hari.',
            'image' => 'https://images.unsplash.com/photo-1675150303909-1bb94e33132f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ]);
    }
}
