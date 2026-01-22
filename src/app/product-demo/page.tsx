"use client";

// ============================================
// TODO 1: Import Dependencies
// ============================================
// - axios: Library untuk melakukan HTTP request (GET, POST, PUT, DELETE)
// - useState: Hook untuk menyimpan data yang bisa berubah
// - useEffect: Hook untuk menjalankan kode saat komponen pertama kali muncul
// - useForm: Hook dari react-hook-form untuk mengelola form dengan mudah
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// ============================================
// TODO 2: Define TypeScript Interface
// ============================================
// Interface adalah "blueprint" atau cetakan untuk data kita
// Ini membantu TypeScript memahami struktur data product
interface Product {
  id: string;
  createdAt: string;
  product: string; // nama product
  price: string; // harga (string dari API)
}

// FormData adalah data yang akan kita kirim saat submit form
// Hanya perlu product dan price (id dan createdAt dihandle API)
interface FormData {
  product: string;
  price: string;
}

// ============================================
// TODO 3: API URL Constant
// ============================================
// Simpan URL API di satu tempat agar mudah diubah
// MockAPI adalah layanan gratis untuk membuat fake API
const API_URL = "https://64ca45bd700d50e3c7049e2f.mockapi.io/product";

// ============================================
// TODO 4: Main Component & State
// ============================================
export default function ProductDemoPage() {
  // State untuk menyimpan daftar products dari API
  const [products, setProducts] = useState<Product[]>([]);

  // State untuk menampilkan loading saat fetch data
  const [loading, setLoading] = useState(true);

  // State untuk mengontrol tampil/sembunyi form
  // true = form tampil, false = form sembunyi
  const [showForm, setShowForm] = useState(false);

  // State untuk menentukan mode: Create atau Edit
  // null = mode Create (buat baru)
  // Product object = mode Edit (edit product ini)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // State untuk menyimpan pesan loading saat submit
  const [submitting, setSubmitting] = useState(false);

  // ============================================
  // TODO 9: Form Setup with React Hook Form
  // ============================================
  // useForm memberikan kita:
  // - register: untuk menghubungkan input ke form
  // - handleSubmit: untuk menangani submit form
  // - reset: untuk mengosongkan atau mengisi form
  // - formState.errors: untuk menampilkan error validasi
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // ============================================
  // TODO 5: Fetch Products (READ)
  // ============================================
  // useEffect dengan [] artinya: jalankan sekali saat komponen muncul
  // Ini adalah operasi READ dalam CRUD
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk mengambil data products dari API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // axios.get() untuk mengambil data (READ)
      const response = await axios.get(API_URL);
      // response.data berisi array of products
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Gagal mengambil data products!");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // TODO 6: Create Product (CREATE)
  // ============================================
  // Fungsi untuk membuat product baru
  const createProduct = async (data: FormData) => {
    try {
      setSubmitting(true);
      // axios.post() untuk membuat data baru (CREATE)
      // Parameter: URL, data yang dikirim
      const response = await axios.post(API_URL, data);
      // Tambahkan product baru ke daftar products
      setProducts([...products, response.data]);
      // Sembunyikan form setelah berhasil
      setShowForm(false);
      // Reset form ke kosong
      reset();
      alert("Product berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Gagal menambahkan product!");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================
  // TODO 7: Update Product (UPDATE)
  // ============================================
  // Fungsi untuk mengupdate product yang sudah ada
  const updateProduct = async (data: FormData) => {
    // Pastikan ada product yang sedang diedit
    if (!editingProduct) return;

    try {
      setSubmitting(true);
      // axios.put() untuk mengupdate data (UPDATE)
      // URL ditambah dengan ID product yang diedit
      const response = await axios.put(`${API_URL}/${editingProduct.id}`, data);
      // Update daftar products dengan data baru
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? response.data : p))
      );
      // Sembunyikan form dan reset state
      setShowForm(false);
      setEditingProduct(null);
      reset();
      alert("Product berhasil diupdate!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Gagal mengupdate product!");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================
  // TODO 8: Delete Product (DELETE)
  // ============================================
  // Fungsi untuk menghapus product
  const deleteProduct = async (id: string) => {
    // window.confirm() menampilkan popup konfirmasi bawaan browser
    // Return true jika user klik OK, false jika Cancel
    if (!window.confirm("Apakah Anda yakin ingin menghapus product ini?")) {
      return; // Batalkan jika user klik Cancel
    }

    try {
      // axios.delete() untuk menghapus data (DELETE)
      await axios.delete(`${API_URL}/${id}`);
      // Hapus product dari daftar (filter yang id-nya tidak sama)
      setProducts(products.filter((p) => p.id !== id));
      alert("Product berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Gagal menghapus product!");
    }
  };

  // ============================================
  // Handler Functions (Pembantu)
  // ============================================

  // Fungsi saat submit form - tentukan CREATE atau UPDATE
  const onSubmit = (data: FormData) => {
    if (editingProduct) {
      // Jika ada editingProduct, berarti mode Edit
      updateProduct(data);
    } else {
      // Jika tidak ada, berarti mode Create
      createProduct(data);
    }
  };

  // Fungsi untuk membuka form dalam mode Create
  const handleAddNew = () => {
    setEditingProduct(null); // Pastikan tidak ada product yang diedit
    reset({ product: "", price: "" }); // Kosongkan form
    setShowForm(true); // Tampilkan form
  };

  // Fungsi untuk membuka form dalam mode Edit
  const handleEdit = (product: Product) => {
    setEditingProduct(product); // Set product yang akan diedit
    reset({ product: product.product, price: product.price }); // Isi form dengan data product
    setShowForm(true); // Tampilkan form
  };

  // Fungsi untuk menutup form
  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    reset();
  };

  // ============================================
  // TODO 10 & 11: UI - Form dan Product List
  // ============================================
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Container utama dengan max-width */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🛒 Product Demo</h1>
          <p className="text-gray-400">
            Belajar CRUD dengan Next.js, Axios, dan React Hook Form
          </p>
        </div>

        {/* Tombol Add New Product */}
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Tambah Product Baru
          </button>
        )}

        {/* ============================================ */}
        {/* TODO 10: Form Section */}
        {/* ============================================ */}
        {/* Form hanya tampil jika showForm === true */}
        {/* Ini adalah "conditional rendering" - cara sederhana show/hide */}
        {showForm && (
          <div className="mb-6 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "✏️ Edit Product" : "➕ Tambah Product Baru"}
            </h2>

            {/* Form dengan handleSubmit dari react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Input Product Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nama Product
                </label>
                <input
                  {...register("product", { required: "Nama product wajib diisi" })}
                  placeholder="Contoh: Laptop Gaming"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                {/* Tampilkan error jika validasi gagal */}
                {errors.product && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.product.message}
                  </p>
                )}
              </div>

              {/* Input Price */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Harga
                </label>
                <input
                  {...register("price", { required: "Harga wajib diisi" })}
                  placeholder="Contoh: 15000000"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                {errors.price && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Tombol Submit dan Cancel */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {submitting ? "Menyimpan..." : "💾 Simpan"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================ */}
        {/* TODO 11: Product List */}
        {/* ============================================ */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📦 Daftar Products</h2>

          {/* Loading State */}
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-400">Belum ada product. Tambahkan yang pertama!</p>
          ) : (
            /* Tabel Product */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Nama Product</th>
                    <th className="pb-3">Harga</th>
                    <th className="pb-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map = loop untuk menampilkan setiap product */}
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 text-gray-400">#{product.id}</td>
                      <td className="py-3">{product.product}</td>
                      <td className="py-3 text-green-400">
                        ${parseFloat(product.price).toFixed(2)}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          {/* Tombol Edit */}
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          {/* Tombol Delete */}
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer dengan info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Total Products: {products.length}</p>
          <p className="mt-1">
            API: <code className="bg-gray-800 px-2 py-1 rounded">{API_URL}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
