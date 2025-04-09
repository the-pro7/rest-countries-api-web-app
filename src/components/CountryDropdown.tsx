import { RxCaretDown, RxCross2 } from "react-icons/rx";
import { useState } from "react";

interface CountryDropdownProps {
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  handleRegionChange: (value: string) => void;
}

const filterRegions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function CountryDropdown({
  region,
  setRegion,
  handleRegionChange,
}: CountryDropdownProps) {
  // State
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  // log("URL", url)
  // const searchParams = useSearchParams()

  return (
    <div
      className={`bg-[var(----color-very-light-gray)] text-[var(--color-very-dark-blue-txt)] dark:bg-[var(--color-dark-blue)] dark:text-white py-3 px-5 rounded-md shadow-md relative !w-[180px] cursor-pointer justify-self-start self-start`}
    >
      <span
        className="flex items-center justify-between gap-3"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {region ? region : "Filter by region"}
        <RxCaretDown
          className={`text-xl transition-transform ease-in-out  ${
            showDropdown && "rotate-180"
          }`}
        />
      </span>
      {/* Region list */}
      <ul
        className={`p-2 m-0 !list-none absolute left-0 top-14 rounded-md shadow-md bg-[var(--color-very-light-gray)] text-[var(--color-very-dark-blue-txt)] dark:bg-[var(--color-dark-blue)] dark:text-white w-[180px] -translate-y-[100%] opacity-0 pointer-events-none ${
          showDropdown && "translate-y-[0] opacity-100 !pointer-events-auto"
        }`}
      >
        {filterRegions.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setRegion(item);
              setShowDropdown(false);
              handleRegionChange(item);
            }}
            className="p-2 rounded-sm cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200"
          >
            {item}
          </li>
        ))}
        <li
          className="p-2 rounded-sm cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 flex items-center gap-2"
          onClick={() => {
            setRegion("");
            setShowDropdown(false);
            handleRegionChange("");
          }}
        >
          <RxCross2 />
          Cancel filter
        </li>
      </ul>
    </div>
  );
}
