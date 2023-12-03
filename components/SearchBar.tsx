import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface SearchBarProps {
  handleSearch: (value: string) => void;
}

export default function SearchBar({ handleSearch }: SearchBarProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleReset() {
    if (searchTerm.length === 0) return
    setSearchTerm("")
    handleSearch("")
  }

  return (
    <div className="w-80 h-10 flex items-center rounded-lg border border-black border-opacity-40 group/search hover:border-opacity-80">
      <input
        className="w-9/12 pl-2 pb-1 focus:outline-none border-0 leading-none bg-transparent"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <div className="w-1/12 mr-2 cursor-pointer" onClick={() => handleReset()}>
        {searchTerm.length > 0 && (
          <XMarkIcon className="w-7 h-7" />
        )}
      </div>
      <div className="w-2/12 h-full bg-blue-600 rounded-r-md flex justify-center cursor-pointer" onClick={() => handleSearch(searchTerm)}>
        <MagnifyingGlassIcon className="w-7 h-7 mt-1.5 mr-1 text-white group-hover/search:text-gray-200" />
      </div>
    </div>
  )
}