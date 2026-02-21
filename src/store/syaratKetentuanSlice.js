import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      title: "KETENTUAN UMUM",
      items: [
        "Dengan mendaftar dan menggunakan layanan XMLTopup, Anda secara otomatis menyetujui semua Ketentuan Layanan kami. Kami berhak mengubah Ketentuan Layanan ini tanpa pemberitahuan terlebih dahulu. Anda diharapkan membaca seluruh Ketentuan Layanan sebelum membuat pesanan.",
        "XMLTopup tidak bertanggung jawab atas kerugian yang terjadi dalam bisnis Anda.",
        "XMLTopup tidak bertanggung jawab atas suspensi akun, pembatasan, atau penghapusan akun yang dilakukan oleh pihak ketiga seperti Instagram, Twitter, Facebook, YouTube, dan platform lainnya.",
        "Layanan sosial media XMLTopup hanya membantu meningkatkan visibilitas akun Anda. Kami tidak menjamin bahwa pengikut atau layanan yang bertambah akan berinteraksi secara aktif.",
        "XMLTopup tidak pernah berafiliasi atau bekerja sama dengan pihak mana pun untuk penjualan atau pembelian panel. Pendaftaran bersifat gratis. Jika ada pihak yang mengatasnamakan XMLTopup untuk kerja sama berbayar, maka itu bukan bagian dari kami dan kami tidak bertanggung jawab atas hal tersebut.",
      ],
    },
    {
      title: "KETENTUAN LAYANAN",
      items: [
        "Penggunaan layanan yang disediakan oleh XMLTopup berarti Anda menyetujui seluruh persyaratan ini. Dengan mendaftar atau menggunakan layanan kami, Anda menyatakan telah membaca dan memahami Ketentuan Layanan secara menyeluruh.",
        "XMLTopup tidak menjamin pengikut atau layanan yang dibeli akan berinteraksi dengan Anda. Kami hanya menjamin jumlah layanan yang Anda beli akan diproses sesuai pesanan, namun tidak menjamin ketahanan atau permanensi karena dapat terjadi penurunan (drop).",
        "XMLTopup tidak menerima pembatalan atau pengembalian dana setelah pesanan masuk ke sistem. Pengembalian dana hanya diberikan apabila pesanan tidak dapat diproses oleh sistem.",
        "Harap membaca dengan teliti deskripsi pada setiap layanan sebelum melakukan pembelian. Anda terikat pada ketentuan yang tertera dalam deskripsi layanan, bukan hanya pada nama layanan. Pastikan memahami dan mengikuti informasi serta FAQ yang tersedia.",
      ],
    },
    {
      title: "STATUS REFILL & REFUND",
      items: [
        "Semua proses refill atau isi ulang dilakukan secara otomatis untuk layanan yang memiliki keterangan refill. Kami tidak dapat memberikan estimasi waktu pasti penyelesaian refill.",
        "Pengembalian dana tidak diberikan kecuali terdapat keterangan refund pada layanan tersebut. Jika terjadi error atau partial, sistem akan otomatis mengembalikan dana sesuai jumlah layanan yang tidak terproses.",
        "Kami tidak memberikan garansi untuk layanan Non-Refill atau layanan tanpa keterangan refill sebagaimana dijelaskan pada deskripsi layanan.",
        "Kesalahan input data oleh pengguna bukan tanggung jawab XMLTopup. Dengan melakukan pesanan, pengguna dianggap telah memeriksa data dengan benar. Kesalahan input tidak dapat dilakukan refund.",
      ],
    },
  ],
};

const syaratKetentuanSlice = createSlice({
  name: "syaratKetentuan",
  initialState,
  reducers: {},
});

export default syaratKetentuanSlice.reducer;
