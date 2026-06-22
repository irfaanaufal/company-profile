import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Carousel({ carousels }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [list, setList] = useState(carousels);
    const [draggedIndex, setDraggedIndex] = useState(null);

    useEffect(() => {
        setList(carousels);
    }, [carousels]);

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        const newList = [...list];
        const draggedItem = newList[draggedIndex];
        newList.splice(draggedIndex, 1);
        newList.splice(index, 0, draggedItem);
        setDraggedIndex(index);
        setList(newList);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        const ids = list.map((item) => item.id);
        router.post(route("admin.carousell.reorder"), { ids }, {
            preserveScroll: true,
        });
    };

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        title: "",
        subtitle: "",
        image: null,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditData(null);
        setImagePreview(null);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (carousel) => {
        setEditData(carousel);
        setImagePreview(carousel.image);
        setData({
            title: carousel.title || "",
            subtitle: carousel.subtitle || "",
            image: null, // Files cannot be pre-populated
            is_active: !!carousel.is_active,
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        clearErrors();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editData) {
            data._method = "PUT";
            post(route("admin.carousell.update", editData.id), {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        } else {
            delete data._method;
            post(route("admin.carousell.store"), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus slide ini?")) {
            destroy(route("admin.carousell.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Kelola Carousel
                    </h2>
                    <button
                        onClick={openCreateModal}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150"
                    >
                        Tambah Slide
                    </button>
                </div>
            }
        >
            <Head title="Kelola Carousel" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg border border-gray-100">
                        <div className="p-6 text-gray-900">
                            {carousels.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    Belum ada slide carousel. Silakan tambahkan
                                    slide baru.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="w-12 px-6 py-3"></th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Gambar
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Judul
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Subjudul
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {list.map((carousel, index) => (
                                                <tr
                                                    key={carousel.id}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, index)}
                                                    onDragOver={(e) => handleDragOver(e, index)}
                                                    onDragEnd={handleDragEnd}
                                                    className={`transition duration-150 ${
                                                        draggedIndex === index
                                                            ? "opacity-50 bg-indigo-50 border-2 border-dashed border-indigo-200"
                                                            : "hover:bg-gray-50"
                                                    }`}
                                                >
                                                    <td className="px-6 py-4 text-center cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition" draggable="false">
                                                        <svg className="w-5 h-5 mx-auto fill-current" viewBox="0 0 20 20" draggable="false">
                                                            <path d="M7 2a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zM7 6a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zM7 10a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zM7 14a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zM7 18a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                                        </svg>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <img
                                                            src={carousel.image}
                                                            alt={carousel.title}
                                                            className="h-16 w-28 rounded object-cover shadow-sm border border-gray-200"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                        {carousel.title || <span className="text-gray-400 italic">Tanpa Judul</span>}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                        {carousel.subtitle || <span className="text-gray-400 italic">-</span>}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {carousel.is_active ? (
                                                            <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                                Aktif
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                                Nonaktif
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    carousel,
                                                                )
                                                            }
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    carousel.id,
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 font-semibold"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
                    <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl transition-all border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {editData
                                ? "Edit Slide Carousel"
                                : "Tambah Slide Carousel"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Subjudul
                                </label>
                                <textarea
                                    value={data.subtitle}
                                    onChange={(e) =>
                                        setData("subtitle", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    rows="2"
                                />
                                {errors.subtitle && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.subtitle}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Gambar
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    accept="image/*"
                                    required={!editData}
                                />
                                {errors.image && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.image}
                                    </p>
                                )}

                                {imagePreview && (
                                    <div className="mt-3">
                                        <span className="block text-xs font-medium text-gray-500 mb-1">
                                            Pratinjau Gambar:
                                        </span>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-32 w-full object-cover rounded border border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData("is_active", e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor="is_active"
                                    className="ml-2 block text-sm font-semibold text-gray-900"
                                >
                                    Aktifkan slide ini
                                </label>
                                {errors.is_active && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.is_active}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none transition duration-150"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none disabled:opacity-50 transition duration-150"
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
