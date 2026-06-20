import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Admin
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                        {/* Carousel Card */}
                        <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6 transition hover:shadow-md duration-150">
                            <dt className="truncate text-sm font-medium text-gray-500">
                                Total Slide Carousel
                            </dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-bold text-indigo-600">
                                    {stats.carousels}
                                </div>
                                <Link
                                    href={route("admin.carousell.index")}
                                    className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-900"
                                >
                                    Kelola &rarr;
                                </Link>
                            </dd>
                        </div>

                        {/* Product Card */}
                        <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6 transition hover:shadow-md duration-150">
                            <dt className="truncate text-sm font-medium text-gray-500">
                                Total Produk
                            </dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-bold text-green-600">
                                    {stats.products}
                                </div>
                                <Link
                                    href={route("admin.produk.index")}
                                    className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-900"
                                >
                                    Kelola &rarr;
                                </Link>
                            </dd>
                        </div>

                        {/* Partnership Card */}
                        <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6 transition hover:shadow-md duration-150">
                            <dt className="truncate text-sm font-medium text-gray-500">
                                Total Kemitraan
                            </dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-bold text-yellow-600">
                                    {stats.partnerships}
                                </div>
                                <Link
                                    href={route("admin.kemitraan.index")}
                                    className="inline-flex items-center text-sm font-semibold text-yellow-600 hover:text-yellow-900"
                                >
                                    Kelola &rarr;
                                </Link>
                            </dd>
                        </div>

                        {/* Certification Card */}
                        <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6 transition hover:shadow-md duration-150">
                            <dt className="truncate text-sm font-medium text-gray-500">
                                Total Sertifikasi
                            </dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-bold text-teal-600">
                                    {stats.certifications}
                                </div>
                                <Link
                                    href={route("admin.sertifikasi.index")}
                                    className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-900"
                                >
                                    Kelola &rarr;
                                </Link>
                            </dd>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
