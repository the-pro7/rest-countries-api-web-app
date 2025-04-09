import { useState, useRef, useEffect } from "react";
import CountryCard from "./components/CountryCard";
import CountryDropdown from "./components/CountryDropdown";
import SearchBox from "./components/SearchBox";
import data from "../db/data.json";
import { useSearchParams } from "react-router";
import NotFound from "./assets/notfound.svg";
import useInfiniteQuery from "./hooks/InfiniteQuery";
// import { log } from "../helpers/helpers";

function App() {
  // State

  const [searchParam, setSearchParam] = useSearchParams();
  const initialQuery = searchParam.get("search") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const initialRegion = searchParam.get("region") || "";
  const [region, setRegion] = useState<string>(initialRegion);
  // Limit on countries
  // Ref
  const divRef = useRef<HTMLDivElement | null>(null);

  // Handle search changes
  function handleSearchChange(value: string) {
    const newParams = new URLSearchParams(searchParam.toString());

    if (value) newParams.set("search", value);
    else newParams.delete("search");

    setSearchParam(newParams);
  }
  // Handle region change
  function handleRegionChange(value: string) {
    const newParams = new URLSearchParams(searchParam.toString());

    if (value) newParams.set("region", value);
    else newParams.delete("region");

    setSearchParam(newParams);
  }

  // function handleLimitChange(value: string) {
  //   const newParams = new URLSearchParams(searchParam.toString());
  useEffect(() => {
    function handleScroll() {
      localStorage.setItem("scrollY", window.scrollY.toString());
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save user back to scroll position
  useEffect(() => {
    const scrollY = localStorage.getItem("scrollY");
    if (scrollY && data.length > 0) {
      window.scrollTo(0, Number(scrollY));
    }
  }, []);
  // const LIMIT = 12;
  // End State

  // Filter by region first
  const regionFilteredData = region
    ? data.filter((item) =>
        item.region.toLowerCase().includes(region.toLowerCase())
      )
    : data;

  // Filter data based on search query
  const filteredData = searchQuery
    ? regionFilteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : regionFilteredData;

  const [visibleCount] = useInfiniteQuery(divRef, filteredData);

  const visibleCountries = filteredData.slice(0, visibleCount);

  return (
    <>
      <main className="px-16 py-10 flex flex-col items-center">
        {/* Just the search and dropdown */}
        <div className="flex justify-between items-center flex-col md:flex-row lg:flex-row gap-4 w-full">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchChange={handleSearchChange}
          />
          <CountryDropdown
            region={region}
            setRegion={setRegion}
            handleRegionChange={handleRegionChange}
          />
        </div>
        {/* Country cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] w-full place-items-center gap-y-7 gap-x-12">
          {visibleCountries.length > 0 ? (
            visibleCountries.flatMap((item, index) => (
              <CountryCard
                key={index}
                image={item.flag}
                countryName={item.name}
                population={item.population}
                region={item.region}
                capital={item.capital!}
              />
            ))
          ) : (
            <div className="!w-[700px] flex flex-col items-center justify-center self-center gap-10">
              <img
                src={NotFound}
                alt="404 not found illustration"
                className="w-[300px]"
              />
              <h1 className="text-xl font-bold text-center">
                Country not found, are you sure it exists{" "}
                {region
                  ? "in your selected region? Try removing the filter."
                  : "?"}
              </h1>
            </div>
          )}
        </div>
        {/* Show load more button if full data length not reached */}
        {visibleCount < filteredData.length && (
          <div
            ref={divRef}
            aria-hidden={true}
            className="w-full flex items-center justify-center my-5"
          >
            Loading more...
          </div>
        )}
      </main>
    </>
  );
}

export default App;
