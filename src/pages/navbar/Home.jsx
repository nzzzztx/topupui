import { useState } from "react"
import Hero from "../../components/Hero"
import Categories from "../../components/Categories"
import InstallBanner from "../../components/InstallBanner"
import GameGrid from "../../components/GameGrid"

export default function Home() {
    const [activeCategory, setActiveCategory] = useState("GAMES")
    const [search, setSearch] = useState("")

    return (
        <>
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
