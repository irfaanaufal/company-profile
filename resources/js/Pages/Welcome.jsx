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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            // Smooth scroll to the top of the section with a clean offset for the fixed navbar
            lenisRef.current.scrollTo(element, {
                offset: -64,
                duration: 1.2,
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
                <div className="mx-full max-w-full w-full px-4 sm:px-6 lg:px-8">
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
                        <div className="hidden lg:flex items-center gap-6">
                            <a
                                href="#beranda"
                                onClick={(e) => handleScrollTo(e, "#beranda")}
                                className="text-sm font-semibold text-slate-600 hover:text-[#2D5A27] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2D5A27] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Beranda
                            </a>
                            <a
                                href="#tentang-kami"
                                onClick={(e) => handleScrollTo(e, "#tentang-kami")}
                                className="text-sm font-semibold text-slate-600 hover:text-[#2D5A27] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2D5A27] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Tentang Kami
                            </a>
                            <a
                                href="#visi-misi"
                                onClick={(e) => handleScrollTo(e, "#visi-misi")}
                                className="text-sm font-semibold text-slate-600 hover:text-[#2D5A27] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2D5A27] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Visi & Misi
                            </a>
                            <a
                                href="#teknologi"
                                onClick={(e) => handleScrollTo(e, "#teknologi")}
                                className="text-sm font-semibold text-slate-600 hover:text-[#2D5A27] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2D5A27] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Fasilitas
                            </a>
                            <a
                                href="#produk"
                                onClick={(e) => handleScrollTo(e, "#produk")}
                                className="text-sm font-semibold text-slate-600 hover:text-[#2D5A27] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2D5A27] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Produk
                            </a>
                            <a
                                href="#kemitraan"
                                onClick={(e) => handleScrollTo(e, "#kemitraan")}
                                className="text-sm font-semibold text-slate-600 hover:text-[#2D5A27] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2D5A27] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Kemitraan
                            </a>
                        </div>

                        {/* CTA (Desktop) */}
                        <div className="hidden lg:block">
                            <a
                                href={getGeneralWhatsAppUrl()}
                                className="rounded-lg bg-[#2D5A27] px-5 py-2 text-sm font-semibold text-white hover:bg-[#20441c] shadow-sm transition"
                            >
                                Hubungi kami
                            </a>
                        </div>

                        {/* Mobile Menu Hamburger Button */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none transition duration-150 cursor-pointer"
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown Panel */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="lg:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <div className="px-4 pt-2 pb-6 space-y-3">
                                <a
                                    href="#beranda"
                                    onClick={(e) => {
                                        handleScrollTo(e, "#beranda");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#2D5A27] hover:bg-slate-50 transition"
                                >
                                    Beranda
                                </a>
                                <a
                                    href="#tentang-kami"
                                    onClick={(e) => {
                                        handleScrollTo(e, "#tentang-kami");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#2D5A27] hover:bg-slate-50 transition"
                                >
                                    Tentang Kami
                                </a>
                                <a
                                    href="#visi-misi"
                                    onClick={(e) => {
                                        handleScrollTo(e, "#visi-misi");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#2D5A27] hover:bg-slate-50 transition"
                                >
                                    Visi & Misi
                                </a>
                                <a
                                    href="#teknologi"
                                    onClick={(e) => {
                                        handleScrollTo(e, "#teknologi");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#2D5A27] hover:bg-slate-50 transition"
                                >
                                    Fasilitas
                                </a>
                                <a
                                    href="#produk"
                                    onClick={(e) => {
                                        handleScrollTo(e, "#produk");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#2D5A27] hover:bg-slate-50 transition"
                                >
                                    Produk
                                </a>
                                <a
                                    href="#kemitraan"
                                    onClick={(e) => {
                                        handleScrollTo(e, "#kemitraan");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:text-[#2D5A27] hover:bg-slate-50 transition"
                                >
                                    Kemitraan
                                </a>
                                <div className="pt-4 border-t border-slate-100">
                                    <a
                                        href={getGeneralWhatsAppUrl()}
                                        className="flex w-full items-center justify-center rounded-lg bg-[#2D5A27] py-2.5 px-4 text-center text-sm font-semibold text-white hover:bg-[#20441c] shadow-sm transition"
                                    >
                                        Hubungi kami
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                                            {slide.title && (
                                                <h1
                                                    className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider leading-tight"
                                                    style={{
                                                        textShadow:
                                                            "0 4px 18px rgba(0, 0, 0, 0.45)",
                                                    }}
                                                >
                                                    {slide.title}
                                                </h1>
                                            )}
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
                                10.000 m2
                            </p>
                            <p className="text-xs sm:text-sm text-slate-900 font-medium mt-2.5">
                                Luas Fasilitas
                            </p>
                        </div>
                        <div className="py-6 md:py-2 px-4 sm:px-6 lg:px-8 md:border-r border-b border-slate-200 md:border-b-0">
                            <p className="text-4xl font-extrabold text-[#2D5A27]">
                                1200+
                            </p>
                            <p className="text-xs sm:text-sm text-slate-900 font-medium mt-2.5">
                                Petani Mitra
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
                                1.5 Juta
                            </p>
                            <p className="text-xs sm:text-sm text-slate-900 font-medium mt-2.5">
                                Kg per-bulan
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
                                <span className="text-sm font-bold uppercase tracking-wider text-[#2D5A27] block">
                                    Siapa Kami
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
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
                                        desc: "Bersumber dari menggunakan bahan baku terpilih dan sesuai dengan standar kualitas.Pemilihan bahan baku yang baik menjadi langkah awal dalam menghasilkan produk berkualitas.",
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
                                        desc: "Perusahaan terus berinvenstasi dalam penggunaan teknologi modern untuk memastikan proses produksi yang efisien dan akurat. Mesin-mesin canggih digunakan dalam tahap penggilingan, pengeringan, sortir hingga pengemasan. Hal ini membantu menjaga konsistensi kualitas produk",
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
                                        title: "Pengawasan Ketat",
                                        desc: "Setiap tahap produksi diawasi secara ketat oleh tim ahli. Pengujian laboratorium dilakukan untuk memastikan kualitas produk. Jika ada ketidaksesuaian, perbaikan segera dilakukan untuk memastikan produk tetap memenuhi standar.",
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

            <section
                id="visi-misi"
                className="relative w-full bg-gradient-to-b from-white via-emerald-50/5 to-white scroll-mt-16 py-16 lg:py-24 border-t border-slate-100 overflow-hidden"
            >
                {/* Decorative section blurs */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 relative z-10">

                    {/* Two-Column Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* LEFT COLUMN: VISI */}
                        <motion.div
                            className="space-y-6 text-left lg:pr-8"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-3">
                                <span className="text-sm font-bold uppercase tracking-wider text-[#2D5A27] block">
                                    Visi Perusahaan
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    Landasan Utama <br />
                                    <span className="text-[#2D5A27]">Kinerja Kami</span>
                                </h2>

                                <div className="relative mt-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-50/30 via-white to-white border border-emerald-500/10 shadow-sm overflow-hidden group">
                                    {/* Decorative subtle gradient background circle */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2D5A27]/5 rounded-full blur-2xl group-hover:bg-[#2D5A27]/10 transition-colors duration-500" />

                                    {/* Quote Icon SVG */}
                                    <svg className="h-10 w-10 text-[#2D5A27]/20 mb-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.827-4.765 5.71h5.77v10.139h-10.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.795 2.827-4.795 5.71h5.8v10.139h-11z" />
                                    </svg>

                                    <p className="text-base sm:text-lg lg:text-[19px] text-slate-700 font-semibold leading-relaxed relative z-10">
                                        "Produk yang dihasilkan oleh PT SINDANG ASIH MAKMUR berlandaskan nilai-nilai keamanan pangan & kepuasan pelanggan serta terbaik dari segi kualitas dan harga."
                                    </p>

                                    <div className="mt-6 flex items-center gap-3">
                                        <div className="h-[2px] w-8 bg-[#2D5A27]" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Komitmen Utama Kami
                                        </span>
                                    </div>
                                </div>

                                {/* 3 Pilar Komitmen di bawah kartu Visi */}
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    {[
                                        {
                                            title: "Higienitas & Bersih",
                                            desc: "Standar kebersihan ketat",
                                            icon: (
                                                <svg className="h-5 w-5 text-[#2D5A27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            )
                                        },
                                        {
                                            title: "Kualitas SNI",
                                            desc: "Mutu beras terjamin resmi",
                                            icon: (
                                                <svg className="h-5 w-5 text-[#2D5A27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )
                                        },
                                        {
                                            title: "Harga Terbaik",
                                            desc: "Nilai terbaik bagi pelanggan",
                                            icon: (
                                                <svg className="h-5 w-5 text-[#2D5A27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )
                                        }
                                    ].map((pilar, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white hover:bg-emerald-50/20 border border-slate-100 hover:border-emerald-500/10 p-4 sm:p-5 rounded-2xl transition-all duration-300 group flex flex-col items-center text-center space-y-2 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] hover:shadow-md"
                                        >
                                            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#2D5A27] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                {pilar.icon}
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-xs sm:text-[13px] font-extrabold text-slate-800">
                                                    {pilar.title}
                                                </p>
                                                <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold leading-tight">
                                                    {pilar.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: MISI */}
                        <motion.div
                            className="space-y-6 text-left"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="space-y-3">
                                <span className="text-sm font-bold uppercase tracking-wider text-[#2D5A27] block">
                                    Misi Kami
                                </span>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        {
                                            num: "01",
                                            title: "Ketersediaan & Kemitraan Pangan",
                                            text: "Senantiasa menjaga ketersediaan bahan olahan (padi/gabah, beras) dengan cara menjalin kemitraan dengan petani serta penyalur beras dari dalam dan luar daerah."
                                        },
                                        {
                                            num: "02",
                                            title: "Relasi Pemasok & Mitra Kerja",
                                            text: "Senantiasa menjaga relasi yang baik dengan para penyedia bahan baku dan mitra kerja (petani, pemasok)."
                                        },
                                        {
                                            num: "03",
                                            title: "Higienitas & Standar SNI",
                                            text: "Senantiasa menjaga hygienitas bahan, alat proses, serta tenaga pengolah (pegawai) dengan menerapkan peraturan yang ketat sesuai dengan Standard Nasional Indonesia & peraturan terkait."
                                        },
                                        {
                                            num: "04",
                                            title: "Pelayanan Prima & Distribusi",
                                            text: "Senantiasa memberikan pelayanan yang prima mulai dari proses pemesanan hingga pendistribusian kepada pelanggan dengan prioritas ketepatan waktu serta tujuan."
                                        }
                                    ].map((misi, i) => (
                                        <div
                                            key={i}
                                            className="group flex gap-5 items-start bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-emerald-500/20 p-5 rounded-2xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="shrink-0 h-11 w-11 rounded-xl bg-emerald-50 text-[#2D5A27] flex items-center justify-center text-sm font-extrabold shadow-inner group-hover:bg-[#2D5A27] group-hover:text-white transition-all duration-300">
                                                {misi.num}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wider transition-colors duration-300 group-hover:text-[#2D5A27] uppercase">
                                                    {misi.title}
                                                </p>
                                                <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed font-medium">
                                                    {misi.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Header Budaya Kerja & Nilai Utama Kami (Centered on white background above the green box) */}
            <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8 text-center pt-20 pb-10">
                <span className="text-sm font-bold uppercase tracking-wider text-[#2D5A27] block">
                    Budaya Kerja
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mt-2">
                    Nilai Utama Kami
                </h2>
            </div>

            {/* BOTTOM SECTION: NILAI UTAMA KAMI (Full-bleed banner with centered content, wrapping only the cards) */}
            <motion.section
                id="nilai-utama"
                className="w-full bg-gradient-to-r from-[#2D5A27] via-[#20441c] to-[#152e12] py-12 text-white relative overflow-hidden border-t border-b border-emerald-900/40"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                {/* Decorative blur filters */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none" />

                <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8 relative z-10 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                title: "Kontrol Kualitas",
                                desc: "Memprioritaskan kontrol kualitas yang ketat dalam setiap tahap produksi. Dari pemilihan bahan baku hingga proses pengemasan, perusahaan memastikan bahwa beras yang dihasilkan memenuhi standar kualitas tertinggi.",
                                icon: (
                                    <svg className="h-6 w-6 text-[#a8d39e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Fokus Pada Pelanggan",
                                desc: "Kami selalu berusaha memahami kebutuhan dan preferensi pelanggan. Dengan mendengarkan masukan dan umpan balik, perusahaan dapat terus meningkatkan layanan dan produknya agar sesuai dengan harapan pelanggan.",
                                icon: (
                                    <svg className="h-6 w-6 text-[#a8d39e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Integritas & Profesional",
                                desc: "Integritas adalah pondasi bisnis yang kuat. Kami berkomitmen untuk beroperasi dengan etika yang tinggi. Karyawan perusahaan diharapkan menjunjung tinggi integritas, transparansi, dan tanggung jawab.",
                                icon: (
                                    <svg className="h-6 w-6 text-[#a8d39e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Patuh Regulasi",
                                desc: "Mematuhi semua peraturan dan regulasi yang berlaku. Dari izin usaha hingga standar kebersihan dan keamanan, perusahaan selalu beroperasi sesuai dengan ketentuan pemerintah.",
                                icon: (
                                    <svg className="h-6 w-6 text-[#a8d39e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                )
                            }
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                className="bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-white/20 p-5 sm:p-6 rounded-2xl transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {value.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[17px] font-extrabold text-white tracking-wide group-hover:text-[#a8d39e] transition-colors duration-300">
                                            {value.title}
                                        </h4>
                                        <p className="text-[13px] text-emerald-100/90 leading-relaxed font-normal">
                                            {value.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════
                SECTION — PENERAPAN TEKNOLOGI
            ═══════════════════════════════════════════ */}
            <section
                id="teknologi"
                className="relative w-full bg-gradient-to-b from-white via-slate-50 to-white flex flex-col items-center justify-center scroll-mt-16 py-16 lg:py-24 border-t border-slate-100"
            >
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    {/* Header: Judul & Deskripsi */}
                    <motion.div
                        className="max-w-3xl text-center px-4 mb-12"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm font-bold uppercase tracking-wider text-[#2D5A27] block">
                            Standar Mutu Modern
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mt-2">
                            Penerapan Teknologi
                        </h2>
                        <div className="h-1 w-16 bg-[#2D5A27] mx-auto mt-4 rounded-full" />
                        <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed">
                            Untuk menjamin kualitas terbaik beras premium, kami menggunakan dukungan mesin pengolahan modern dengan standar teknologi tinggi dalam setiap tahapan proses produksi.
                        </p>
                    </motion.div>

                    {/* Gallery Container */}
                    <motion.div
                        className="grid grid-cols-1 md:flex md:items-stretch gap-4 w-full max-w-7xl md:h-[450px] px-2 mt-4"
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {[
                            {
                                title: "COLOUR SORTER",
                                subtitle: "CCD Camera Technology",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=800&auto=format&fit=crop",
                                description: "Colour sorter berperan penting untuk menjamin produk beras yang dihasilkan bebas dari kontaminasi beras berwarna lain, cacat atau benda asing menggunakan teknologi CCD Camera yang canggih.",
                                icon: (
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "RICE POLISHER",
                                subtitle: "Japanese Polishing Tech",
                                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&h=800&auto=format&fit=crop",
                                description: "Untuk menghasilkan beras yang putih, bersih dan mengkilat, kami menggunakan polisher canggih berteknologi Jepang yang aman dan alami.",
                                icon: (
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                )
                            },
                            {
                                title: "RICE GRADER",
                                subtitle: "Integrated Sizing System",
                                image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&h=800&auto=format&fit=crop",
                                description: "Untuk menghasilkan beras dengan kadar patahan yang terukur, kami menggunakan rice grader modern yang terintegrasi.",
                                icon: (
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                )
                            },
                            {
                                title: "DESTONER",
                                subtitle: "Impurity Extraction",
                                image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&h=800&auto=format&fit=crop",
                                description: "Produk yang kami hasilkan bebas dari kontaminasi batu atau benda asing sejenis berkat dukungan teknologi pemisah batu modern.",
                                icon: (
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                )
                            },
                            {
                                title: "PADDY SEPARATOR",
                                subtitle: "Husk-Free Quality",
                                image: "https://plus.unsplash.com/premium_photo-1682144551791-e400fcae2a2a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                description: "Butir gabah yang belum terkelupas dapat dipisahkan secara presisi sehingga tidak ada lagi butir gabah dalam piring nasi Anda.",
                                icon: (
                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                )
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="relative group w-full md:w-36 md:flex-grow h-[350px] md:h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out md:hover:w-full border border-slate-100/10 cursor-pointer min-w-[100px] md:min-w-[140px]"
                            >
                                {/* Background Image */}
                                <img
                                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 md:group-hover:scale-105"
                                    src={item.image}
                                    alt={item.title}
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 md:group-hover:from-black/95 md:group-hover:via-black/75 md:group-hover:to-black/45 transition-all duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10 select-none">
                                    {/* Icon Badge */}
                                    <div className="mb-4 h-10 w-10 rounded-xl bg-[#2D5A27]/90 border border-[#2D5A27] flex items-center justify-center shadow-md">
                                        {item.icon}
                                    </div>

                                    {/* Text Content */}
                                    <h3 className="text-xl md:text-2xl font-black tracking-wider uppercase text-white">
                                        {item.title}
                                    </h3>

                                    <p className="text-emerald-400 text-xs md:text-sm font-semibold uppercase tracking-wider mt-1 md:group-hover:opacity-0 md:group-hover:-translate-y-2 md:group-hover:h-0 overflow-hidden transition-all duration-300">
                                        {item.subtitle}
                                    </p>

                                    {/* Hidden detailed contents that show up on hover for desktop, and always show on mobile */}
                                    <div className="mt-3 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-[300px] overflow-hidden transition-all duration-500 ease-in-out md:group-hover:delay-100">
                                        {item.description && (
                                            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
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
                                            <h3 className="text-xl font-bold text-slate-900 text-center">
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
                                                <h3 className="text-2xl font-bold text-slate-900 text-center">
                                                    {product.name}
                                                </h3>
                                                <p className="text-base text-slate-500 text-center leading-relaxed line-clamp-4 flex-1">
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
                                        href="#visi-misi"
                                        onClick={(e) => handleScrollTo(e, "#visi-misi")}
                                        className="hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        Visi & Misi
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#teknologi"
                                        onClick={(e) => handleScrollTo(e, "#teknologi")}
                                        className="hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        Fasilitas
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
                                        href="mailto:sindangasih_cianjur@yahoo.co.id"
                                        className="hover:text-white transition duration-200 break-all"
                                    >
                                        sindangasih_cianjur@yahoo.co.id
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:sindangasih_cianjur@yahoo.co.id"
                                        className="hover:text-white transition duration-200 break-all"
                                    >
                                        order@sindangasih.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={getGeneralWhatsAppUrl()}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition duration-200"
                                    >
                                        0263 266789
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
                                {/* <li className="text-sm text-slate-400 leading-relaxed">
                                    Senin - Sabtu: 08:00 - 16:00
                                </li> */}
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className="relative w-full max-w-2xl bg-gradient-to-br from-white via-slate-50 to-emerald-50/10 rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-2xl flex flex-col gap-5 cursor-default overflow-hidden"
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 15 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Radial Glows */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                            {/* Floating Close Button */}
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-30 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm border border-slate-200/50 backdrop-blur-sm"
                                aria-label="Close modal"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Content Grid */}
                            <div className="grid md:grid-cols-2 gap-6 items-center relative z-10">
                                {/* Left: Image Presentation Card */}
                                <div className="relative flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl p-6 shadow-sm aspect-square md:aspect-auto select-none overflow-hidden">
                                    {/* Subtle dot pattern background */}
                                    <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="max-h-[180px] sm:max-h-[220px] md:max-h-[260px] w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500 ease-out z-10"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80";
                                        }}
                                    />
                                </div>

                                {/* Right: Product Details Column */}
                                <div className="flex flex-col justify-between h-full space-y-4">
                                    <div className="space-y-4">
                                        {/* Category Badge */}
                                        {selectedProduct.category && (
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#2D5A27] text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-100/50 px-2.5 py-1 w-fit shadow-xs">
                                                <span className="h-1 w-1 rounded-full bg-[#2D5A27] animate-pulse" />
                                                {selectedProduct.category}
                                            </span>
                                        )}

                                        {/* Title & Accent Bar */}
                                        <div className="space-y-1.5">
                                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                                                {selectedProduct.name}
                                            </h3>
                                            <div className="h-1 w-12 bg-gradient-to-r from-[#2D5A27] to-emerald-500 rounded-full" />
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                                            {selectedProduct.description}
                                        </p>

                                        {/* Specifications Detail Block */}
                                        <div className="space-y-2 border-t border-slate-100 pt-4 mt-2">
                                            {selectedProduct.composition && (
                                                <div className="flex items-center justify-between border-b border-slate-100/60 pb-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Komposisi</span>
                                                    <span className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-0.5 shadow-sm">
                                                        {selectedProduct.composition}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between border-b border-slate-100/60 pb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tekstur Beras</span>
                                                <span className="text-xs font-semibold text-[#2D5A27] bg-emerald-50/50 border border-emerald-100/40 rounded-lg px-2.5 py-0.5 shadow-sm">
                                                    Pulen & Lembut
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-1">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kemasan Tersedia</span>
                                                <span className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-0.5 shadow-sm">
                                                    5 Kg / 10 Kg / 25 Kg
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buy Button with WhatsApp Branding */}
                                    <a
                                        href={getWhatsAppUrl(selectedProduct.name)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#2D5A27] to-[#1e3d1a] py-3 px-5 text-sm font-bold text-white hover:shadow-lg hover:shadow-emerald-900/15 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 shadow-md border border-emerald-800/10 cursor-pointer"
                                    >
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <span>Hubungi Via WhatsApp</span>
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
