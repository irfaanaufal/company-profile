import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome({
    auth,
    setting,
    carousels,
    products,
    partnerships,
    certifications,
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element && lenisRef.current) {
            lenisRef.current.scrollTo(element, {
                offset: -64,
                duration: 1.5,
            });
        }
    };

    useEffect(() => {
        if (carousels && carousels.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) =>
                    prev === carousels.length - 1 ? 0 : prev + 1,
                );
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [carousels]);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? carousels.length - 1 : prev - 1,
        );
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) =>
            prev === carousels.length - 1 ? 0 : prev + 1,
        );
    };

    const getWhatsAppUrl = (productName) => {
        const phone = "6281233337920";
        const message = `Halo PT Sindang Asih Makmur, saya tertarik untuk mengetahui lebih lanjut tentang produk "${productName}".`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    const getGeneralWhatsAppUrl = () => {
        const phone = "6281233337920";
        const message = `Halo PT Sindang Asih Makmur, saya ingin bertanya mengenai layanan Anda.`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="bg-white text-slate-800 selection:bg-[#2D5A27] selection:text-white font-sans antialiased">
            <Head title="PT Sindang Asih Makmur" />

            {/* ── NAVIGATION (fixed, di atas semua section) ── */}
            <nav className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="mx-auto max-w-full w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center shrink-0">
                            <div className="relative flex items-center justify-center">
                                <img
                                    src="/images/logo-ptsam.png"
                                    alt="Logo"
                                    className="h-10 md:h-12 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        if (e.target.nextSibling) {
                                            e.target.nextSibling.style.display =
                                                "flex";
                                        }
                                    }}
                                />
                                <div
                                    className="h-9 w-9 bg-[#2D5A27] rounded-full flex items-center justify-center text-white font-extrabold text-base shadow"
                                    style={{
                                        display: "none",
                                    }}
                                >
                                    S
                                </div>
                            </div>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <a
                                href="#beranda"
                                onClick={(e) => handleScrollTo(e, "#beranda")}
                                className="text-sm font-semibold text-slate-700 hover:text-[#2D5A27] transition cursor-pointer"
                            >
                                Beranda
                            </a>
                            <a
                                href="#tentang-kami"
                                onClick={(e) => handleScrollTo(e, "#tentang-kami")}
                                className="text-sm font-semibold text-slate-700 hover:text-[#2D5A27] transition cursor-pointer"
                            >
                                Tentang Kami
                            </a>
                            <a
                                href="#produk"
                                onClick={(e) => handleScrollTo(e, "#produk")}
                                className="text-sm font-semibold text-slate-700 hover:text-[#2D5A27] transition cursor-pointer"
                            >
                                Produk
                            </a>
                            <a
                                href="#kemitraan"
                                onClick={(e) => handleScrollTo(e, "#kemitraan")}
                                className="text-sm font-semibold text-slate-700 hover:text-[#2D5A27] transition cursor-pointer"
                            >
                                Kemitraan
                            </a>
                        </div>

                        {/* CTA */}
                        <div>
                            <a
                                href={getGeneralWhatsAppUrl()}
                                className="rounded-lg bg-[#2D5A27] px-5 py-2 text-sm font-semibold text-white hover:bg-[#20441c] shadow-sm transition"
                            >
                                Hubungi kami
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-full w-full px-4 sm:px-6 lg:px-8 pt-20 bg-white">
                <section
                    id="beranda"
                    className="relative w-full overflow-hidden bg-slate-900 rounded-3xl shadow-lg border border-slate-100"
                    style={{ height: "calc(100vh - 110px)" }}
                >
                    {carousels && carousels.length > 0 ? (
                        <>
                            {carousels.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide
                                        ? "opacity-100 z-10"
                                        : "opacity-0 z-0"
                                        }`}
                                >
                                    {/* Overlay gelap */}
                                    <div className="absolute inset-0 bg-black/45 z-10" />
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    {/* Teks slide — tengah vertikal & horizontal */}
                                    <div className="relative z-20 flex h-full items-center justify-center px-6 text-center">
                                        <div className="space-y-4 max-w-3xl">
                                            <h1
                                                className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider leading-tight"
                                                style={{
                                                    textShadow:
                                                        "0 4px 18px rgba(0, 0, 0, 0.45)",
                                                }}
                                            >
                                                {slide.title}
                                            </h1>
                                            {slide.subtitle && (
                                                <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto font-medium">
                                                    {slide.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Tombol Prev / Next */}
                            {carousels.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevSlide}
                                        className="absolute left-5 top-1/2 z-30 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-full bg-black/15 text-white hover:bg-[#2D5A27] hover:scale-105 active:scale-95 backdrop-blur-sm transition duration-200 focus:outline-none"
                                        aria-label="Slide sebelumnya"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleNextSlide}
                                        className="absolute right-5 top-1/2 z-30 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-full bg-black/15 text-white hover:bg-[#2D5A27] hover:scale-105 active:scale-95 backdrop-blur-sm transition duration-200 focus:outline-none"
                                        aria-label="Slide berikutnya"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>

                                    {/* Slide Progress / Counter Indicator */}
                                    <div className="absolute bottom-8 left-8 z-30 flex items-center gap-3 text-white">
                                        <span className="text-sm font-semibold tracking-wider">
                                            {String(currentSlide + 1).padStart(
                                                2,
                                                "0",
                                            )}
                                        </span>
                                        <div className="h-[2px] w-12 bg-white/30 rounded-full relative overflow-hidden">
                                            <div
                                                className="absolute top-0 bottom-0 left-0 bg-[#2D5A27] transition-all duration-500 rounded-full"
                                                style={{
                                                    width: `${((currentSlide + 1) / carousels.length) * 100}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-white/55 tracking-wider">
                                            {String(carousels.length).padStart(
                                                2,
                                                "0",
                                            )}
                                        </span>
                                    </div>
                                </>
                            )}

                            {/* Scroll-down hint */}
                            {/* <div className="absolute bottom-8 right-8 z-30 hidden sm:flex flex-col items-center gap-1 text-white/60">
                                <span className="text-[10px] uppercase tracking-widest font-semibold">
                                    Scroll
                                </span>
                                <svg
                                    className="h-4 w-4 animate-bounce"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div> */}
                        </>
                    ) : (
                        /* Fallback jika tidak ada carousel */
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-950 px-6 text-center">
                            <div className="space-y-4 max-w-3xl">
                                <h1 className="text-5xl sm:text-6xl font-black text-white uppercase tracking-wider">
                                    PT Sindang Asih Makmur
                                </h1>
                                <p className="text-lg text-green-200">
                                    Menyalurkan beras berkualitas ke seluruh
                                    Indonesia
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* ═══════════════════════════════════════════
                SECTION 2 — MENYALURKAN BERAS (full height) (Tentang Kami Part 1)
            ═══════════════════════════════════════════ */}
            <section
                id="tentang-kami"
                className="relative w-full bg-white flex flex-col justify-between scroll-mt-16"
                style={{ minHeight: "calc(100vh - 110px)" }}
            >
                <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex items-center py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                        {/* Kiri: Teks */}
                        <motion.div
                            className="space-y-7"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-4">
                                <h2 className="text-4xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                                    Menyalurkan{" "}
                                    <span className="text-[#2D5A27]">
                                        beras berkualitas
                                    </span>
                                    <br />
                                    ke seluruh Indonesia
                                </h2>
                                <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-lg">
                                    Dari ladang terbaik Indonesia, kami
                                    menghadirkan beras premium berkualitas
                                    tinggi yang diproses secara profesional
                                    dan didistribusikan secara luas untuk
                                    memenuhi kebutuhan masyarakat di seluruh
                                    Indonesia.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={getGeneralWhatsAppUrl()}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#2D5A27] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#20441c] transition shadow-sm"
                                >
                                    Permintaan Penawaran
                                </a>
                                <a
                                    href="#produk"
                                    onClick={(e) => handleScrollTo(e, "#produk")}
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-50 transition shadow-sm cursor-pointer"
                                >
                                    Lihat produk
                                </a>
                            </div>
                        </motion.div>

                        {/* Kanan: Gambar */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="border border-[#2D5A27] p-3.5 bg-white shadow-sm rounded-none">
                                <img
                                    src="/images/petani.jpg"
                                    alt="Beras berkualitas"
                                    className="w-full h-auto object-cover rounded-none"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80";
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Bar — w-full di bawah */}
                <motion.div
                    className="w-full border-y border-slate-200 bg-slate-50/50 py-10 md:py-14 mt-12 lg:mt-16"
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 text-center">
                        <div className="py-6 md:py-2 px-4 sm:px-6 lg:px-8 border-r border-b border-slate-200 md:border-b-0">
                            <p className="text-4xl font-extrabold text-[#2D5A27]">
                                15+
                            </p>
                            <p className="text-xs sm:text-sm text-slate-900 font-medium mt-2.5">
                                Kemitraan
                            </p>
                        </div>
                        <div className="py-6 md:py-2 px-4 sm:px-6 lg:px-8 md:border-r border-b border-slate-200 md:border-b-0">
                            <p className="text-4xl font-extrabold text-[#2D5A27]">
                                1.2M
                            </p>
                            <p className="text-xs sm:text-sm text-slate-900 font-medium mt-2.5">
                                Ton metrik tahun 2025
                            </p>
                        </div>
                        <div className="py-6 md:py-2 px-4 sm:px-6 lg:px-8 border-r border-slate-200">
                            <p className="text-4xl font-extrabold text-[#2D5A27]">
                                26 tahun
                            </p>
                            <p className="text-xs sm:text-sm text-slate-900 font-medium mt-2.5">
                                Sudah beroperasi
                            </p>
                        </div>
                        <div className="py-6 md:py-2 px-4 sm:px-6 lg:px-8">
                            <p className="text-4xl font-extrabold text-[#2D5A27]">
                                1.200+
                            </p>
                            <p className="text-xs sm:text-sm text-slate-900 font-medium mt-2.5">
                                Petani Mitra
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION — TENTANG KAMI (Siapa Kami)
            ═══════════════════════════════════════════ */}
            <section
                id="siapa-kami"
                className="relative w-full bg-white flex flex-col justify-center scroll-mt-16 py-16 lg:py-24"
                style={{ minHeight: "calc(100vh - 110px)" }}
            >
                <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Kiri: teks panjang */}
                        <motion.div
                            className="space-y-5"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-3">
                                <span className="text-sm font-semibold text-[#2D5A27]">
                                    Siapa Kami
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                                    Dibangun atas dasar{" "}
                                    <span className="text-[#2D5A27]">
                                        kepercayaan,
                                    </span>
                                    <br />
                                    tumbuh dari tanah.
                                </h2>
                            </div>
                            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                                <p>
                                    Berawal dari tahun 1970-an, pendiri
                                    perusahaan memulai usaha dengan memasok
                                    beras ke Pasar Induk Cipinang. Dengan
                                    komitmen yang kuat terhadap kualitas produk,
                                    usaha ini terus berkembang hingga memasok
                                    berbagai jenis beras unggulan seperti Beras
                                    Pandan Wangi, Beras Setra Ramos, dan
                                    varietas berkualitas lainnya ke berbagai
                                    pasar tradisional. Kepercayaan pelanggan
                                    yang terus meningkat menjadi fondasi
                                    pertumbuhan perusahaan dari waktu ke waktu.
                                </p>
                                <p>
                                    Memasuki awal tahun 2000-an, kami mulai
                                    memperluas jangkauan ke pasar modern dan
                                    dipercaya sebagai pemasok beras private
                                    brand untuk Carrefour serta salah satu
                                    jaringan minimarket ternama. Sejak saat ini,
                                    kami juga dipercaya memasok berbagai
                                    supermarket besar seperti Toserba Yogya,
                                    Lion Super Indo, Giant, Hero Supermarket,
                                    Farmers Market, dan Foodhall. Hingga saat
                                    ini, kami terus berkomitmen menghadirkan
                                    beras berkualitas terbaik dengan standar
                                    yang terjaga dan didukung berbagai
                                    sertifikasi sebagai bentuk jaminan mutu bagi
                                    pelanggan.
                                </p>
                            </div>
                        </motion.div>

                        {/* Kanan: 4 keunggulan + stats */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* 4 Keunggulan */}
                            <div className="space-y-5">
                                {[
                                    {
                                        icon: (
                                            <svg
                                                className="h-6 w-6 text-green-700"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.8}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        ),
                                        title: "Bahan Baku Pilihan",
                                        desc: "Bersumber dari bahan baku gabah & beras pilihan dengan standard kualitas yang tinggi",
                                    },
                                    {
                                        icon: (
                                            <svg
                                                className="h-6 w-6 text-green-700"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.8}
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                        ),
                                        title: "Teknologi Tinggi",
                                        desc: "Diproses menggunakan teknologi tinggi yang menghasilkan beras premium berkualitas",
                                    },
                                    {
                                        icon: (
                                            <svg
                                                className="h-6 w-6 text-green-700"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.8}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.8}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        ),
                                        title: "Pengawasan Ahli",
                                        desc: "Diawasi oleh ahli yang berpengalaman lebih dari 30 tahun untuk menjaga mutu produk",
                                    },
                                    {
                                        icon: (
                                            <svg
                                                className="h-6 w-6 text-green-700"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.8}
                                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                />
                                            </svg>
                                        ),
                                        title: "Tersetifikasi",
                                        desc: "Jaminan produk aman dengan sistem keamanan pangan yang telah tersertifikasi",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-4 items-start"
                                    >
                                        <div className="shrink-0 h-11 w-11 rounded-xl bg-[#2D5A27]/10 border border-[#2D5A27]/20 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold text-slate-900">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Stats bar */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                                <div className="text-center space-y-1">
                                    <p className="text-2xl sm:text-3xl font-extrabold text-[#2D5A27]">
                                        1.200+
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Petani Mitra
                                    </p>
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-2xl sm:text-3xl font-extrabold text-[#2D5A27]">
                                        4
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Fasilitas Produksi
                                    </p>
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-2xl sm:text-3xl font-extrabold text-[#2D5A27]">
                                        91,3%
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Pengiriman tepat waktu
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION — PRODUK KAMI
            ═══════════════════════════════════════════ */}
            <section
                id="produk"
                className="relative w-full bg-white flex flex-col justify-center scroll-mt-16 py-16 lg:py-24"
                style={{ minHeight: "calc(100vh - 110px)" }}
            >
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header baris: judul+deskripsi kiri, link kanan */}
                    <motion.div
                        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-12"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-2 max-w-xl">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D5A27]">
                                Produk Kami
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Beragam varietas beras yang dipilih secara
                                cermat untuk berbagai pasar global, mulai dari
                                beras pokok sehari-hari hingga beras spesial
                                premium.
                            </p>
                        </div>
                        {products && products.length > 3 && (
                            <button
                                onClick={() => setShowAllProducts(!showAllProducts)}
                                className="shrink-0 text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-[#2D5A27] transition self-start sm:self-center whitespace-nowrap cursor-pointer"
                            >
                                {showAllProducts ? "Lebih Sedikit" : "Semua Produk"}
                            </button>
                        )}
                    </motion.div>

                    {/* Grid produk */}
                    {products && products.length > 0 ? (
                        <div className="space-y-6">
                            {/* Menampilkan 3 produk pertama */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.slice(0, 3).map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300"
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                    >
                                        {/* Gambar besar */}
                                        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Konten bawah */}
                                        <div className="flex flex-1 flex-col p-6 gap-3">
                                            <h3 className="text-base font-bold text-slate-900 text-center">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 text-center leading-relaxed line-clamp-4 flex-1">
                                                {product.description}
                                            </p>
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-[#2D5A27] py-2.5 px-4 text-sm font-semibold text-[#ffffff] bg-[#2D5A27] hover:bg-[#20441c] hover:text-[#ffffff] transition duration-200 cursor-pointer"
                                            >
                                                Detail Produk
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Menampilkan sisa produk dengan transisi collapse */}
                            {products.length > 3 && (
                                <div
                                    className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ease-in-out overflow-hidden ${showAllProducts
                                        ? "max-h-[3000px] opacity-100 mt-6"
                                        : "max-h-0 opacity-0 pointer-events-none mt-0"
                                        }`}
                                >
                                    {products.slice(3).map((product) => (
                                        <div
                                            key={product.id}
                                            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300"
                                        >
                                            {/* Gambar besar */}
                                            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Konten bawah */}
                                            <div className="flex flex-1 flex-col p-6 gap-3">
                                                <h3 className="text-base font-bold text-slate-900 text-center">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-slate-500 text-center leading-relaxed line-clamp-4 flex-1">
                                                    {product.description}
                                                </p>
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-[#2D5A27] py-2.5 px-4 text-sm font-semibold text-[#ffffff] bg-[#2D5A27] hover:bg-[#20441c] hover:text-[#ffffff] transition duration-200 cursor-pointer"
                                                >
                                                    Detail Produk
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="text-center py-16 text-slate-400 text-sm">
                            Katalog produk saat ini belum tersedia.
                        </div>
                    )}
                </div>
            </section>

            {/* ── KEMITRAAN & SERTIFIKASI ── */}
            <section id="kemitraan" className="py-20 bg-white scroll-mt-16">
                <div className="mx-auto max-w-full w-full px-4 sm:px-6 lg:px-8">
                    {/* Toko Ritel Kemitraan */}
                    <motion.div
                        className="space-y-3 mb-10 text-left"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm font-bold uppercase tracking-wider text-[#2D5A27]">
                            Dapatkan produk kami disini
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Temukan beras kami di toko-toko terdekat
                        </h2>
                    </motion.div>

                    {partnerships && partnerships.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-8 items-center justify-items-start w-full"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            {partnerships.map((partner) => (
                                <div
                                    key={partner.id}
                                    className="h-24 sm:h-28 w-full flex items-center justify-start hover:scale-105 transition-all duration-300 ease-out"
                                >
                                    <img
                                        src={partner.image}
                                        alt={partner.title}
                                        title={partner.title}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 text-slate-400 text-sm">
                            Mitra toko ritel saat ini belum terdaftar.
                        </div>
                    )}

                    {/* Sertifikasi & Legalitas */}
                    <motion.div
                        className="mt-24 pt-16 border-t border-slate-100 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="lg:col-span-6 space-y-3 text-left">
                            <span className="text-sm font-bold uppercase tracking-wider text-[#2D5A27]">
                                Legalitas dan Sertifikasi
                            </span>
                            <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">
                                Keamanan dan Kepercayaan dengan Sertifikasi
                                Resmi
                            </h3>
                        </div>
                        <div className="lg:col-span-6 mt-8 lg:mt-0 flex flex-wrap gap-8 items-center justify-start lg:justify-end">
                            {certifications && certifications.length > 0 ? (
                                certifications.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="h-24 w-28 sm:h-28 sm:w-32 flex items-center justify-center hover:scale-105 transition duration-300 ease-out"
                                    >
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            title={cert.title}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-400">
                                    Data sertifikasi belum tersedia.
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="bg-[#0f2411] text-slate-300 pt-16 pb-12 border-t border-[#09170a] font-sans">
                <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    {/* ── MAIN GRID ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                        {/* Kolom 1: Profil Singkat */}
                        <div className="lg:col-span-2 space-y-5">
                            <div className="relative flex items-center bg-white rounded-md p-1 w-fit">
                                <img
                                    src="/images/logo-ptsam.png"
                                    alt="PT Sindang Asih Makmur Logo"
                                    className="h-10 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        if (e.target.nextSibling) {
                                            e.target.nextSibling.style.display =
                                                "flex";
                                        }
                                    }}
                                />
                                <div
                                    className="h-9 w-9 bg-green-700 rounded-full flex items-center justify-center text-white font-extrabold text-base shadow"
                                    style={{ display: "none" }}
                                >
                                    S
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                                PT Sindang Asih Makmur adalah produsen dan
                                distributor beras premium terpercaya di
                                Indonesia, mengolah hasil tani terbaik dengan
                                standar higienis modern untuk konsumsi keluarga
                                Anda.
                            </p>
                        </div>

                        {/* Kolom 2: Navigasi Bisnis */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-green-400">
                                Navigasi
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-400">
                                <li>
                                    <a
                                        href="#beranda"
                                        onClick={(e) => handleScrollTo(e, "#beranda")}
                                        className="hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        Beranda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#tentang-kami"
                                        onClick={(e) => handleScrollTo(e, "#tentang-kami")}
                                        className="hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        Tentang Kami
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#produk"
                                        onClick={(e) => handleScrollTo(e, "#produk")}
                                        className="hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        Produk Kami
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#kemitraan"
                                        onClick={(e) => handleScrollTo(e, "#kemitraan")}
                                        className="hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        Kemitraan Ritel
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Kolom 3: Hubungi Kami */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-green-400">
                                Hubungi Kami
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-400">
                                <li>
                                    <a
                                        href="mailto:customer.care@sindangasih.com"
                                        className="hover:text-white transition duration-200 break-all"
                                    >
                                        customer.care@sindangasih.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={getGeneralWhatsAppUrl()}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition duration-200"
                                    >
                                        +62 812-3333-7920 (WA)
                                    </a>
                                </li>
                                <li className="text-sm text-slate-400 leading-relaxed">
                                    Senin - Sabtu: 08:00 - 16:00
                                </li>
                            </ul>
                        </div>

                        {/* Kolom 4: Kantor Utama */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-green-400">
                                Kantor Operasional
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Jl. KH. Saleh Sindangasih No. 168,
                                <br />
                                Sindangasih, Karangtengah
                                <br />
                                Kabupaten Cianjur, Jawa Barat 43281
                            </p>
                        </div>
                    </div>

                    {/* ── BOTTOM AREA: COPYRIGHT & SOSIAL MEDIA ── */}
                    <div className="border-t border-slate-800/60 mt-6 pt-4 flex flex-col items-center justify-center gap-3 text-xs text-slate-500 text-center">
                        <p>
                            © {new Date().getFullYear()} PT Sindang Asih Makmur.
                            Hak Cipta Dilindungi.
                        </p>

                        {/* Sosial Media Minimalis */}
                        <div className="flex items-center justify-center gap-4 text-slate-400">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-white transition duration-200"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="h-4.5 w-4.5 fill-none stroke-current"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                >
                                    <rect
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="5"
                                        ry="5"
                                    />
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                    <line
                                        x1="17.5"
                                        y1="6.5"
                                        x2="17.51"
                                        y2="6.5"
                                    />
                                </svg>
                            </a>
                            <a
                                href="mailto:customer.care@sindangasih.com"
                                className="hover:text-white transition duration-200"
                                aria-label="Email"
                            >
                                <svg
                                    className="h-4.5 w-4.5 fill-none stroke-current"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </a>
                            <a
                                href={getGeneralWhatsAppUrl()}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-white transition duration-200"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    className="h-4.5 w-4.5 fill-none stroke-current"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ── FLOATING WHATSAPP ── */}
            {/* <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="WhatsApp Contact"
            >
                <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.47 1.33 4.98L2 22l5.23-1.37c1.46.8 3.1 1.22 4.78 1.22 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.273 14.3c-.26.73-1.25 1.34-2.02 1.5-.53.11-1.22.2-3.55-.77-2.98-1.24-4.9-4.27-5.05-4.47-.15-.2-1.22-1.63-1.22-3.1 0-1.48.77-2.2 1.04-2.5.27-.3.59-.38.79-.38.2 0 .4 0 .58.01.19.01.44-.07.69.53.26.63.88 2.14.96 2.3.08.16.13.35.02.57-.11.22-.16.36-.33.55-.17.19-.36.43-.51.58-.17.17-.35.35-.15.69.2.34.89 1.47 1.91 2.38 1.32 1.18 2.43 1.55 2.78 1.72.35.17.55.15.76-.08.21-.23.91-1.06 1.16-1.43.25-.37.49-.31.83-.18.34.13 2.17 1.02 2.54 1.2.37.18.62.27.71.42.09.16.09.92-.17 1.65z" />
                </svg>
            </a> */}

            {/* ── DETAIL PRODUK MODAL ── */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-4xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 rounded-3xl border border-slate-100 p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col gap-6 cursor-default overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Radial Glows */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                            {/* Header Navigation & Close Button */}
                            <div className="flex justify-between items-center relative z-10">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="flex items-center gap-1.5 text-slate-400 hover:text-slate-800 transition font-bold text-xs uppercase tracking-wider cursor-pointer"
                                >
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Kembali
                                </button>
                            </div>

                            {/* Modal Content Grid */}
                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch relative z-10">
                                {/* Left: Image Container */}
                                <div className="flex items-center justify-center bg-gradient-to-tr from-slate-50 to-emerald-50/30 border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm aspect-square md:aspect-auto select-none hover:shadow-md transition duration-300">
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="max-h-[300px] md:max-h-[380px] w-auto object-contain drop-shadow-md hover:scale-105 transition duration-500 ease-out"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80";
                                        }}
                                    />
                                </div>

                                {/* Right: Product Details */}
                                <div className="flex flex-col justify-between">
                                    <div className="space-y-4">
                                        {/* Category Badge */}
                                        {selectedProduct.category && (
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#2D5A27] text-[10px] sm:text-xs px-3.5 py-1.5 font-bold uppercase tracking-wider rounded-full border border-emerald-100/80">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#2D5A27] animate-pulse" />
                                                {selectedProduct.category}
                                            </span>
                                        )}

                                        {/* Title */}
                                        <div className="space-y-2">
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                                                {selectedProduct.name}
                                            </h3>
                                            <div className="h-1 w-12 bg-gradient-to-r from-[#2D5A27] to-emerald-500 rounded-full" />
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium pt-2">
                                            {selectedProduct.description}
                                        </p>

                                        {/* Composition Info Block */}
                                        {selectedProduct.composition && (
                                            <div className="bg-slate-50/80 border border-slate-100/80 rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-6 overflow-hidden">
                                                <div className="flex flex-col shrink-0 pl-2 sm:pl-3">
                                                    <span className="text-sm font-extrabold text-slate-800">Komposisi</span>
                                                </div>
                                                <span className="text-xs sm:text-sm text-slate-700 font-semibold bg-white border border-slate-100 rounded-xl px-4 py-2.5 shadow-sm text-left sm:text-right leading-relaxed max-w-full sm:max-w-[70%] break-words whitespace-normal">
                                                    {selectedProduct.composition}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Buy Button */}
                                    <a
                                        href={getWhatsAppUrl(selectedProduct.name)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#2D5A27] to-[#1f421b] py-3.5 px-6 text-base font-bold text-white hover:from-[#20441c] hover:to-[#173214] transition-all duration-300 shadow-[0_4px_14px_rgba(45,90,39,0.25)] hover:shadow-[0_6px_20px_rgba(45,90,39,0.35)] active:scale-[0.98] cursor-pointer"
                                    >
                                        Beli Sekarang
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
