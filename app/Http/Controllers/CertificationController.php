<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Certification', [
            'certifications' => Certification::orderBy('position', 'asc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->only(['title', 'description']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/certifications', 'public');
            $data['image'] = '/storage/'.$path;
        }

        Certification::create($data);

        return redirect()->back()->with('success', 'Sertifikasi berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certification $sertifikasi)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->only(['title', 'description']);

        if ($request->hasFile('image')) {
            if ($sertifikasi->image && str_starts_with($sertifikasi->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $sertifikasi->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('uploads/certifications', 'public');
            $data['image'] = '/storage/'.$path;
        }

        $sertifikasi->update($data);

        return redirect()->back()->with('success', 'Sertifikasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certification $sertifikasi)
    {
        if ($sertifikasi->image && str_starts_with($sertifikasi->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $sertifikasi->image);
            Storage::disk('public')->delete($oldPath);
        }

        $sertifikasi->delete();

        return redirect()->back()->with('success', 'Sertifikasi berhasil dihapus.');
    }

    /**
     * Reorder the resources.
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
        ]);

        foreach ($request->ids as $index => $id) {
            Certification::where('id', $id)->update(['position' => $index + 1]);
        }

        return redirect()->back()->with('success', 'Urutan sertifikasi berhasil diperbarui.');
    }
}
