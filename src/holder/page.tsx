import { useState } from "react";
import { EventList } from "./components/EventList";
import { GenreSelector } from "./components/GenreSelector";
import { Header } from "./components/Header";
import { MainCarousel } from "./components/MainCarousel";

export default function HolderPage() {
  const [selectedGenre, setSelectedGenre] = useState("ALL");

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <MainCarousel />
        <GenreSelector
          selectedGenre={selectedGenre}
          onSelect={setSelectedGenre}
        />
        <EventList />
      </main>
    </div>
  );
}
