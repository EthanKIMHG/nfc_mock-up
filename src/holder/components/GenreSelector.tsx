import { cn } from "@/lib/utils";

const GENRES = ["ALL", "K-POP", "ROCK", "DJ", "EDM"];

interface GenreSelectorProps {
  selectedGenre: string;
  onSelect: (genre: string) => void;
}

export function GenreSelector({ selectedGenre, onSelect }: GenreSelectorProps) {
  return (
    <div className="py-4">
      <div className="flex items-center gap-4 px-5 overflow-x-auto no-scrollbar whitespace-nowrap">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelect(genre)}
            className={cn(
              "text-[16px] font-bold tracking-tight transition-colors",
              selectedGenre === genre
                ? "text-[#A3C7D6]"
                : "text-gray-500 hover:text-gray-300"
            )}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="px-5 mt-1">
        <p className="text-[12px] text-gray-500">다가오는 이벤트 32</p>
      </div>
    </div>
  );
}
