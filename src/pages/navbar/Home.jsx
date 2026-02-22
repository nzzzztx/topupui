import { useState } from "react"
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero"
import Categories from "../../components/Categories"
import InstallBanner from "../../components/InstallBanner"
import GameGrid from "../../components/GameGrid"

export default function Home() {
    const [activeCategory, setActiveCategory] = useState("GAMES")
    const [search, setSearch] = useState("")

    return (
        <>
            <Helmet>
                <title>XML Topup - Top Up Game Termurah</title>
                <meta name="description" content="Top up game murah, cepat dan terpercaya hanya di XML Topup." />
                <meta property="og:title" content="XML Topup - Top Up Game Termurah" />
            </Helmet>
            <Hero />
            <Categories
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                search={search}
                setSearch={setSearch}
            />
            <InstallBanner />
            <GameGrid
                activeCategory={activeCategory}
                search={search}
            />
        </>
    )
}
