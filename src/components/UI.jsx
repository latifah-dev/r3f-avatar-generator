// Mengimpor useEffect dari React untuk menangani efek samping
import { useEffect } from "react";
// Mengimpor pb (PocketBase instance) dan useConfiguratorStore (store Zustand) dari "../store"
import { pb, useConfiguratorStore } from "../store";

//3 - Komponen AssetsBox untuk menampilkan kategori dan aset yang terkait
const AssetsBox = () => {
  // Mengambil state dan fungsi dari store Zustand (useConfiguratorStore)
  const {
    categories,          // Daftar kategori yang tersedia
    currentCategory,     // Kategori yang saat ini dipilih
    fetchCategories,     // Fungsi untuk mengambil kategori dan aset dari API
    setCurrentCategory   // Fungsi untuk mengatur kategori yang sedang dipilih
  } = useConfiguratorStore();

  // Menggunakan useEffect untuk menjalankan `fetchCategories` sekali saat komponen ini pertama kali dimount
  useEffect(() => {
    fetchCategories();
  }, []); // Dependency array kosong memastikan ini hanya dijalankan sekali

  return (
    <div className="rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden ">
      {/* Bagian untuk menampilkan daftar kategori sebagai tombol */}
      <div className="flex items-center gap-8 pointer-events-auto overflow-x-auto noscrollbar px-6 pb-2">
        {categories.map((category) => (
          <button
            key={category.id} // Key unik untuk setiap kategori
            onClick={() => setCurrentCategory(category)} // Mengatur kategori saat ini ketika tombol diklik
            className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${
              currentCategory?.name === category.name // Jika kategori saat ini dipilih, beri style yang berbeda
                ? "text-white shadow-purple-100 border-b-white" 
                : "text-gray-400 hover:text-gray-500 border-b-transparent"
            }`}
          >
            {category.name} {/* Nama kategori ditampilkan di tombol */}
          </button>
        ))}
      </div>

      {/* Bagian untuk menampilkan aset dari kategori yang dipilih */}
      <div className="flex gap-2 flex-wrap px-6">
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.id} // Key unik untuk setiap aset
            className={`w-20 h-20 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
              bg-gradient-to-tr from-black to-gray-800`}
          >
            {/* Gambar aset ditampilkan, diambil dari PocketBase URL */}
            <img
              className="object-cover w-full h-full"
              src={pb.files.getUrl(asset, asset.thumbnail)} // Mendapatkan URL gambar dari PocketBase
            />
          </button>
        ))}
      </div>
    </div>
  );
};

//2 - Komponen DownloadButton untuk tombol download
const DownloadButton = () => {
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
    >
      Download {/* Teks pada tombol download */}
    </button>
  );
};

//1 - Komponen utama UI yang merangkum semua komponen seperti header dan AssetsBox
export const UI = () => {
  return (
    <main className="pointer-events-none fixed z-10 inset-0 select-none">
      {/* Struktur layout utama */}
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        {/* Bagian header atas */}
        <div className="flex justify-between items-center p-10">
          {/* Logo yang bisa diklik untuk navigasi */}
          <a
            className="pointer-events-auto"
            href="https://lessons.wawasensei.dev/courses/react-three-fiber"
          >
            <img className="w-20" src="/images/logo.png" />
          </a>
          {/* Tombol download di sebelah kanan header */}
          <div className="flex items-center gap-2">
            <DownloadButton />
          </div>
        </div>
        
        {/* Bagian utama yang menampilkan komponen AssetsBox */}
        <div className="px-10 flex flex-col">
          <AssetsBox />
        </div>
      </div>
    </main>
  );
};
