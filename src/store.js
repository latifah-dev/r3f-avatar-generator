// Mengimpor fungsi `create` dari pustaka "zustand" untuk membuat store state management.
import { create } from "zustand";

// Mengimpor PocketBase untuk berkomunikasi dengan API PocketBase.
import PocketBase from "pocketbase";

// Mendapatkan URL PocketBase dari environment variable menggunakan `import.meta.env`.
const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;

// Jika `VITE_POCKETBASE_URL` tidak ditemukan, akan menampilkan error.
if (!pocketBaseUrl) {
  throw new Error("VITE_POCKETBASE_URL is required");
}

// Membuat instance PocketBase menggunakan URL yang didapat dari environment variable.
export const pb = new PocketBase(pocketBaseUrl);

// Membuat store menggunakan Zustand untuk mengelola state dari konfigurasi kategori dan aset.
export const useConfiguratorStore = create((set) => ({
  // Menyimpan daftar kategori yang akan digunakan.
  categories: [],

  // Menyimpan kategori saat ini yang dipilih oleh pengguna.
  currentCategory: null,

  // Menyimpan daftar aset yang terkait dengan kategori.
  assets: [],

  // Fungsi untuk mengambil daftar kategori dan aset dari PocketBase API.
  fetchCategories: async () => {
    // Mengambil daftar penuh dari koleksi "CostumizationGroups" dan mengurutkan berdasarkan `position` secara ascending.
    const categories = await pb.collection("CostumizationGroups").getFullList({
      sort: "+position", // "+" untuk ascending
    });

    // Mengambil daftar penuh dari koleksi "CostumizationAssets" dan mengurutkan berdasarkan waktu pembuatan secara descending.
    const assets = await pb.collection("CostumizationAssets").getFullList({
      sort: "-created", // "-" untuk descending
    });

    // Mengiterasi kategori dan menambahkan aset yang sesuai dengan setiap kategori berdasarkan `group` ID.
    categories.forEach((category) => {
      category.assets = assets.filter((asset) => asset.group === category.id);
    });

    // Menyimpan kategori, kategori saat ini, dan daftar aset ke dalam state.
    set({ categories, currentCategory: categories[0], assets });
  },

  // Fungsi untuk mengatur kategori saat ini yang dipilih oleh pengguna.
  setCurrentCategory: (category) => set({ currentCategory: category }),
}));
