import mlLogo from "../assets/img/mobile_legends.png";
import ffLogo from "../assets/img/free_fire.png";
import pubgLogo from "../assets/img/pubg_mobile.png";
import valoLogo from "../assets/img/valorant.png";
import genshinLogo from "../assets/img/genshin_impact.png";
import deltaLogo from "../assets/img/delta_force.png";

export const products = [
  {
    slug: "mobile-legends",
    name: "Mobile Legends",
    banner: mlLogo,
    description: "Top up Mobile Legends cepat & otomatis 24 jam.",

    fields: [
      { name: "userId", label: "User ID", type: "text" },
      { name: "zoneId", label: "Zone ID", type: "text" },
    ],

    denominations: [
      { id: 1, name: "86 Diamonds", price: 20000 },
      { id: 2, name: "172 Diamonds", price: 40000 },
      { id: 3, name: "257 Diamonds", price: 60000 },
      { id: 4, name: "706 Diamonds", price: 155000 },
    ],
  },

  {
    slug: "free-fire",
    name: "Free Fire",
    banner: ffLogo,
    description: "Top up Free Fire murah dan terpercaya.",

    fields: [{ name: "playerId", label: "Player ID", type: "text" }],

    denominations: [
      { id: 1, name: "70 Diamonds", price: 10000 },
      { id: 2, name: "140 Diamonds", price: 20000 },
      { id: 3, name: "355 Diamonds", price: 50000 },
      { id: 4, name: "720 Diamonds", price: 100000 },
    ],
  },

  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    banner: pubgLogo,
    description: "Top up UC PUBG resmi & instan.",

    fields: [{ name: "playerId", label: "Player ID", type: "text" }],

    denominations: [
      { id: 1, name: "60 UC", price: 15000 },
      { id: 2, name: "325 UC", price: 75000 },
      { id: 3, name: "660 UC", price: 150000 },
      { id: 4, name: "11950 UC", price: 2237610 },
    ],
  },

  {
    slug: "valorant",
    name: "Valorant",
    banner: valoLogo,
    description: "Top up Valorant Points resmi & cepat.",

    fields: [
      { name: "riotId", label: "Riot ID", type: "text" },
      { name: "tag", label: "Tag (contoh: 1234)", type: "text" },
    ],

    denominations: [
      { id: 1, name: "420 VP", price: 50000 },
      { id: 2, name: "700 VP", price: 80000 },
      { id: 3, name: "1375 VP", price: 150000 },
    ],
  },

  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    banner: genshinLogo,
    description: "Top up Genesis Crystal Genshin Impact instan.",

    fields: [
      { name: "uid", label: "UID", type: "text" },
      {
        name: "server",
        label: "Pilih Server",
        type: "select",
        options: ["Asia", "America", "Europe", "TW_HK_MO"],
      },
    ],

    denominations: [
      { id: 1, name: "60 Genesis Crystal", price: 15000 },
      { id: 2, name: "300 Genesis Crystal", price: 75000 },
      { id: 3, name: "980 Genesis Crystal", price: 230000 },
    ],
  },

  {
    slug: "delta-force",
    name: "Delta Force",
    banner: deltaLogo,
    description: "Top up Delta Force cepat & aman.",

    fields: [{ name: "playerId", label: "Player ID", type: "text" }],

    denominations: [
      { id: 1, name: "100 Coins", price: 20000 },
      { id: 2, name: "500 Coins", price: 90000 },
      { id: 3, name: "1000 Coins", price: 170000 },
    ],
  },
];
