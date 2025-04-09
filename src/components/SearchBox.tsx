import { CiSearch } from "react-icons/ci";
// import type { SetURLSearchParams } from "react-router";

interface SearchBoxProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (value: string) => void
  searchQuery: string;
}

export default function SearchBox({
  searchQuery,
  setSearchQuery,
  handleSearchChange
}: SearchBoxProps) {
  return (
    <div className="flex items-center w-full md:w-[400px] lg:w-[400px] rounded-sm px-3 bg-[var(--color-very-light-gray)] text-[var(--color-very-dark-blue-txt)] dark:bg-[var(--color-dark-blue)] dark:text-white shadow-xl">
      <CiSearch className="text-2xl" />
      <input
        type="search"
        placeholder="Search for a country..."
        className="w-full h-full py-3 px-5 active:outline-transparent active:border-0 placeholder:font-semibold"
        value={searchQuery}
        onChange={(event) => {
          const value = event.target.value;
          setSearchQuery(value);
          handleSearchChange(value)
        }}
      />
    </div>
  );
}
