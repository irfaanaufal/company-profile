<?php

namespace App\Http\Controllers;

use App\Models\Carousel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarouselController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Carousel', [
            'carousels' => Carousel::orderBy('position', 'asc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'is_active' => 'required|boolean',
        ]);

        $data = $request->only(['title', 'subtitle', 'is_active']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/carousels', 'public');
            $data['image'] = '/storage/'.$path;
        }

        Carousel::create($data);

        return redirect()->back()->with('success', 'Slide carousel berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Carousel $carousell)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'is_active' => 'required|boolean',
        ]);

        $data = $request->only(['title', 'subtitle', 'is_active']);

        if ($request->hasFile('image')) {
            if ($carousell->image && str_starts_with($carousell->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $carousell->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('uploads/carousels', 'public');
            $data['image'] = '/storage/'.$path;
        }

        $carousell->update($data);

        return redirect()->back()->with('success', 'Slide carousel berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carousel $carousell)
    {
        if ($carousell->image && str_starts_with($carousell->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $carousell->image);
            Storage::disk('public')->delete($oldPath);
        }

        $carousell->delete();

        return redirect()->back()->with('success', 'Slide carousel berhasil dihapus.');
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
            Carousel::where('id', $id)->update(['position' => $index + 1]);
        }

        return redirect()->back()->with('success', 'Urutan slide berhasil diperbarui.');
    }
}
