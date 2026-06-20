<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Product', [
            'products' => Product::orderBy('position', 'asc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string|max:255',
            'composition' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'category', 'composition']);
        $data['slug'] = Str::slug($request->name).'-'.time();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/products', 'public');
            $data['image'] = '/storage/'.$path;
        }

        Product::create($data);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $produk)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string|max:255',
            'composition' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'category', 'composition']);

        if ($produk->name !== $request->name) {
            $data['slug'] = Str::slug($request->name).'-'.time();
        }

        if ($request->hasFile('image')) {
            if ($produk->image && str_starts_with($produk->image, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $produk->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('uploads/products', 'public');
            $data['image'] = '/storage/'.$path;
        }

        $produk->update($data);

        return redirect()->back()->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $produk)
    {
        if ($produk->image && str_starts_with($produk->image, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $produk->image);
            Storage::disk('public')->delete($oldPath);
        }

        $produk->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus.');
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
            Product::where('id', $id)->update(['position' => $index + 1]);
        }

        return redirect()->back()->with('success', 'Urutan produk berhasil diperbarui.');
    }
}
