<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    /**
     * Update the settings in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'company_name' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'about_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'about' => 'nullable|string',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
        ]);

        $setting = Setting::first();
        if (! $setting) {
            $setting = new Setting;
        }

        $data = $request->only(['company_name', 'about', 'address', 'phone', 'email']);

        if ($request->hasFile('logo')) {
            if ($setting->logo && str_starts_with($setting->logo, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $setting->logo);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('logo')->store('uploads/settings', 'public');
            $data['logo'] = '/storage/'.$path;
        }

        if ($request->hasFile('about_image')) {
            if ($setting->about_image && str_starts_with($setting->about_image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $setting->about_image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('about_image')->store('uploads/settings', 'public');
            $data['about_image'] = '/storage/'.$path;
        }

        $setting->fill($data);
        $setting->save();

        return redirect()->back()->with('success', 'Pengaturan profil perusahaan berhasil diperbarui.');
    }
}
