import mlLogo from "../assets/img/mobile_legends.png";
import ffLogo from "../assets/img/free_fire.png";
import pubgLogo from "../assets/img/pubg_mobile.png";
import valoLogo from "../assets/img/valorant.png";
import genshinLogo from "../assets/img/genshin_impact.png";
import deltaLogo from "../assets/img/delta_force.png";
import danaLogo from "../assets/img/dana.png";
import playstoreLogo from "../assets/img/google_play_indonesia.png";
import telkomLogo from "../assets/img/telkomsel.png";

export const products = [

  // ================= MOBILE LEGENDS =================
  {
    id: 1,
    slug: "mobile-legends",
    name: "Mobile Legends",
    category: "game",
    type: "topup",
    banner: mlLogo,
    description: "Top up Mobile Legends cepat & otomatis 24 jam.",
    popular: true,
    status: "active",

    fields: [
      { name: "userId", label: "User ID", type: "text", required: true },
      { name: "zoneId", label: "Zone ID", type: "text", required: true },
    ],

    denominations: [
      { id: 101, name: "86 Diamonds", price: 20000 },
      { id: 102, name: "172 Diamonds", price: 40000 },
      { id: 103, name: "257 Diamonds", price: 60000 },
      { id: 104, name: "706 Diamonds", price: 155000 },
    ],
  },

  // ================= FREE FIRE =================
  {
    id: 2,
    slug: "free-fire",
    name: "Free Fire",
    category: "game",
    type: "topup",
    banner: ffLogo,
    description: "Top up Free Fire murah dan terpercaya.",
    popular: true,
    status: "active",

    fields: [
      { name: "playerId", label: "Player ID", type: "text", required: true },
    ],

    denominations: [
      { id: 201, name: "70 Diamonds", price: 10000 },
      { id: 202, name: "140 Diamonds", price: 20000 },
      { id: 203, name: "355 Diamonds", price: 50000 },
      { id: 204, name: "720 Diamonds", price: 100000 },
    ],
  },

  // ================= PUBG =================
  {
    id: 3,
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    category: "game",
    type: "topup",
    banner: pubgLogo,
    description: "Top up UC PUBG resmi & instan.",
    popular: true,
    status: "active",

    fields: [
      { name: "playerId", label: "Player ID", type: "text", required: true },
    ],

    denominations: [
      { id: 301, name: "60 UC", price: 15000 },
      { id: 302, name: "325 UC", price: 75000 },
      { id: 303, name: "660 UC", price: 150000 },
      { id: 304, name: "11950 UC", price: 2237610 },
    ],
  },

  // ================= VALORANT =================
  {
    id: 4,
    slug: "valorant",
    name: "Valorant",
    category: "game",
    type: "topup",
    banner: valoLogo,
    description: "Top up Valorant Points resmi & cepat.",
    status: "active",

    fields: [
      { name: "riotId", label: "Riot ID", type: "text", required: true },
      { name: "tag", label: "Tag (contoh: 1234)", type: "text", required: true },
    ],

    denominations: [
      { id: 401, name: "420 VP", price: 50000 },
      { id: 402, name: "700 VP", price: 80000 },
      { id: 403, name: "1375 VP", price: 150000 },
    ],
  },

  // ================= GENSHIN =================
  {
    id: 5,
    slug: "genshin-impact",
    name: "Genshin Impact",
    category: "game",
    type: "topup",
    banner: genshinLogo,
    description: "Top up Genesis Crystal Genshin Impact instan.",
    status: "active",

    fields: [
      { name: "uid", label: "UID", type: "text", required: true },
      {
        name: "server",
        label: "Pilih Server",
        type: "select",
        required: true,
        options: ["Asia", "America", "Europe", "TW_HK_MO"],
      },
    ],

    denominations: [
      { id: 501, name: "60 Genesis Crystal", price: 15000 },
      { id: 502, name: "300 Genesis Crystal", price: 75000 },
      { id: 503, name: "980 Genesis Crystal", price: 230000 },
    ],
  },

  // ================= DELTA FORCE =================
  {
    id: 6,
    slug: "delta-force",
    name: "Delta Force",
    category: "game",
    type: "topup",
    banner: deltaLogo,
    description: "Top up Delta Force cepat & aman.",
    status: "active",

    fields: [
      { name: "playerId", label: "Player ID", type: "text", required: true },
    ],

    denominations: [
      { id: 601, name: "100 Coins", price: 20000 },
      { id: 602, name: "500 Coins", price: 90000 },
      { id: 603, name: "1000 Coins", price: 170000 },
    ],
  },

  // ================= VOUCHER DANA =================
  {
    id: 7,
    slug: "dana",
    name: "Voucher Dana",
    category: "voucher",
    type: "voucher",
    banner: danaLogo,
    description: "Voucher saldo Dana instan.",
    status: "active",

    fields: [
      {
        name: "phoneNumber",
        label: "Nomor HP Dana",
        type: "text",
        placeholder: "Contoh: 081234567890",
        required: true,
        validation: "phone"
      },
    ],

    denominations: [
      { id: 701, name: "Rp 10.000", price: 11000 },
      { id: 702, name: "Rp 20.000", price: 21000 },
      { id: 703, name: "Rp 50.000", price: 52000 },
      { id: 704, name: "Rp 100.000", price: 102000 },
      { id: 705, name: "Rp 150.000", price: 152000 },
    ],
  },

  // ================= GOOGLE PLAY =================
  {
    id: 8,
    slug: "google-play-indonesia",
    name: "Google Play Indonesia",
    category: "voucher",
    type: "voucher",
    banner: playstoreLogo,
    description: "Voucher Google Play resmi Indonesia.",
    status: "active",

    fields: [
      {
        name: "email",
        label: "Email Penerima Voucher",
        type: "email",
        placeholder: "contoh@email.com",
        required: true,
        validation: "email"
      },
    ],

    denominations: [
      { id: 801, name: "Rp 20.000", price: 21000 },
      { id: 802, name: "Rp 50.000", price: 52000 },
      { id: 803, name: "Rp 100.000", price: 103000 },
      { id: 804, name: "Rp 200.000", price: 203000 },
      { id: 805, name: "Rp 500.000", price: 503000 },
    ],
  },

  // ================= TELKOMSEL =================
  {
    id: 9,
    slug: "telkomsel",
    name: "Pulsa Telkomsel",
    category: "pulsa",
    type: "pulsa",
    banner: telkomLogo,
    description: "Isi ulang pulsa Telkomsel cepat.",
    status: "active",

    fields: [
      { name: "phone", label: "Nomor HP", type: "text", required: true },
    ],

    denominations: [
      { id: 901, name: "Rp 10.000", price: 10500 },
      { id: 902, name: "Rp 25.000", price: 25500 },
      { id: 903, name: "Rp 50.000", price: 50500 },
      { id: 904, name: "Rp 70.000", price: 76500 },
      { id: 905, name: "Rp 100.000", price: 100500 },
    ],
  },

];