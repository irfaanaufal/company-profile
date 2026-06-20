<?php

namespace App\Http\Controllers;

use App\Models\Partnership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PartnershipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Partnership', [
            'partnerships' => Partnership::orderBy('position', 'asc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->only(['title', 'description']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/partnerships', 'public');
            $data['image'] = '/storage/'.$path;
        }

        Partnership::create($data);

        return redirect()->back()->with('success', 'Kemitraan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partnership $kemitraan)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->only(['title', 'description']);

        if ($request->hasFile('image')) {
            if ($kemitraan->image && str_starts_with($kemitraan->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $kemitraan->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('uploads/partnerships', 'public');
            $data['image'] = '/storage/'.$path;
        }

        $kemitraan->update($data);

        return redirect()->back()->with('success', 'Kemitraan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partnership $kemitraan)
    {
        if ($kemitraan->image && str_starts_with($kemitraan->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $kemitraan->image);
            Storage::disk('public')->delete($oldPath);
        }

        $kemitraan->delete();

        return redirect()->back()->with('success', 'Kemitraan berhasil dihapus.');
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
            Partnership::where('id', $id)->update(['position' => $index + 1]);
        }

        return redirect()->back()->with('success', 'Urutan kemitraan berhasil diperbarui.');
    }
}
