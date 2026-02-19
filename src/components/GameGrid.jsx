import { useState } from "react"
import { Link } from "react-router-dom"

const images = import.meta.glob("../assets/img/*.png", {
    eager: true,
    import: "default",
})
const data = {
    GAMES: [
        "mobile_legends.png",
        "free_fire.png",
        "pubg_mobile.png",
        "valorant.png",
        "genshin_impact.png",
        "point_blank.png",
        "delta_force.png",
        "call_of_duty_mobile.png",
        "magic_chess.png",
        "ace_racer.png",
        "apex_legends_mobile.png",
        "among_us.png",
        "arena_of_valor.png",
        "league_of_legends.png",
        "au2_mobile.png",
        "bleach_mobile_3d.png",
        "marvel_super_war.png",
        "rules_of_survival_mobile.png",
        "speed_drifters.png",
        "stumble_guys.png",
        "honkai_impact.png",
        "one_punch_man.png",
        "8_ball_pool.png",
        "omega_legends.png",
        "honorofking.png",
        "metalslug.png",
        "bullet_angel.png",
        "lords_mobile.png",
        "pubgm_new_state.png",
        "ragnarok_m__eternal_love.png",
        "ragnarok_origin.png",
        "hago.png",
        "chaos_crisis.png",
        "heroes_evolved.png",
        "counter_strike.png",
        "asphalt.png",
        "clash_of_clans.png",
        "cross_fire.png",
        "super_sus.png",
        "marvel_snap.png",
        "lifeafter_credits.png",
    ],

    VOUCHER: [
        "google_play_indonesia.png",
        "Battle Net Gift Card.png",
        "unipin_voucher.png",
        "nintendo_eshop.png",
        "megaxus.png",
        "roblox.png",
        "steam_wallet_(idr).png",
        "xbox.png",
        "playstation.png",
        "riot_cash.png",
        "spotify.png",
        "point_blank.png",
        "wifi_id.png",
        "dota_auto_chess_candy_(global).png",
        "pubg_mobile.png",
        "vidio.png",
        "garena.png",
        "razer_gold.png"
    ],

    EMONEY: [
        "dana.png",
        "ovo.png",
        "gopay.png",
        "shopee_pay.png",
        "linkaja.png",
        "bri_brizzi.png",
        "astrapay.png",
        "tapcash_bni.png",
        "tix_id.png",
        "grab.png",
        "i.saku.png",
        "mandiri_etoll.png"
    ],

    MOBILE: [
        "telkomsel.png",
        "xl.png",
        "tri.png",
        "indosat.png",
        "smartfren.png",
        "byu.png",
        "axis.png",
    ],

    BUNDLE: [
        "nex_parabola.png",
        "wetv.png",
        "pln.png",
    ],
}

export default function GameGrid({ activeCategory, search }) {

    const currentItems = data[activeCategory] || []

    const filteredItems = currentItems.filter((file) =>
        file.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="px-4 md:px-16 mt-10 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6 md:gap-8">

            {filteredItems.map((file) => {

                const img = images[`../assets/img/${file}`]
                if (!img) return null

                const id = file.replace(".png", "").replace(/_/g, "-")

                const name = file
                    .replace(".png", "")
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())

                return (
                    <Link
                        to={`/product/${id}`}
                        key={id}
                        className="group bg-[#111827] rounded-2xl overflow-hidden shadow-md hover:shadow-blue-500/30 transition duration-300"
                    >
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={img}
                                alt={name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                        </div>

                        <div className="p-3 text-center text-xs md:text-sm font-medium text-white truncate">
                            {name}
                        </div>
                    </Link>
                )
            })}

        </div>
    )
}
