import { Link, useNavigate, useParams } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import data from "../../db/data.json";
import { numberFormatter, getBorderCountries } from "../../helpers/helpers";
import type { CountryType } from "../../types/countryType";

export default function CountryDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  //   Find country
  const country = data.find((item) => item.name === name!);

  return (
    <div className="py-10 px-16">
      <button
        onClick={() => {
          // Check id there's history
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            // If there's no history just go back to homepage
            navigate("/", { replace: true });
          }
        }}
        className="cursor-pointer flex items-center justify-center gap-2 w-fit shadow-md py-2 px-4 rounded-md font-extralight tracking-wider bg-[var(--color-very-light-gray)] text-[var(--color-very-dark-blue-txt)] dark:text-white dark:bg-[var(--color-dark-blue)] dark:hover:bg-gray-500 hover:bg-gray-300 transition-all ease-in-out hover:scale-[1.03]"
      >
        <IoIosArrowRoundBack className="text-inherit text-2xl" />
        Back
      </button>
      <div className="mt-16 flex flex-col items-start md:items-center justify-center gap-7 md:gap-22 lg:flex-row mb-10">
        {/* Flag */}
        <div className="md:w-full lg:w-[850px] md:h-[350px]">
          <img src={country?.flag} className="h-full w-full object-cover" />
        </div>
        {/* Country details */}
        <div className="mt-5 w-full">
          <h1 className="font-extrabold text-3xl">{country?.name}</h1>
          {/* Other details */}
          <div className="mt-7 flex gap-22 items-start flex-col md:flex-row">
            {/* First part of details */}
            <div className="flex flex-col md:justify-between gap-2">
              <p className="font-semibold capitalize flex gap-1">
                native name:
                <span className="font-extralight">{country?.nativeName}</span>
              </p>
              <p className="font-semibold capitalize flex gap-1">
                population:
                <span className="font-extralight">
                  {numberFormatter(country?.population as number)}
                </span>
              </p>
              <p className="font-semibold capitalize flex gap-1">
                region:
                <span className="font-extralight">{country?.region}</span>
              </p>
              <p className="font-semibold capitalize flex gap-1">
                sub region:
                <span className="font-extralight">{country?.subregion}</span>
              </p>
              <p className="font-semibold capitalize flex gap-1">
                capital:
                <span className="font-extralight">{country?.capital}</span>
              </p>
            </div>
            {/* Second part of details */}
            <div className="flex flex-col md:justify-between gap-2">
              <p className="font-semibold capitalize flex gap-1">
                top level domain:
                <span className="font-extralight">
                  {country?.topLevelDomain}
                </span>
              </p>
              <p className="font-semibold capitalize flex gap-1">
                currencies:
                <span className="font-extralight">
                  {country?.currencies?.[0].name}
                </span>
              </p>
              <p className="font-semibold capitalize flex gap-1">
                languages:
                <span className="font-extralight">
                  {country?.languages.map((item) => item.name).join(", ")}
                </span>
              </p>
            </div>
          </div>
          <div className="capitalize mt-8 flex flex-col md:flex-row gap-3 items-start md:items-baseline">
            <p>border countries:</p>
            <div className="flex flex-wrap gap-3 max-w-[530px]">
              {country?.borders && country?.borders.length > 0 ? (
                getBorderCountries(
                  country?.borders as string[],
                  data as CountryType[]
                ).map((border, index) => (
                  <span
                    key={index}
                    className=" py-1 px-3 rounded-md shadow-md font-extralight bg-[var(--color-very-light-gray)] text-[var(--color-very-dark-blue-txt)] dark:bg-[var(--color-dark-blue)] dark:text-white"
                  >
                    {border.name}
                  </span>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Attributions */}
      {/* For the sake of the design */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-center absolute bottom-0 left-0 right-0  bg-gray-100 text-[var(--color-dark-blue)] dark:bg-[var(--color-dark-blue)] dark:text-white">
        <p>Challenge by: <Link to="https://www.frontendmentor.io/" target="_blank" className="text-blue-500 underline">Frontend Mentor</Link></p>
        <p>
          Built by: <Link to="https://github.com/the-pro7" target="_blank" className="text-blue-500 underline">Emmanuel Opoku-Ameyaw</Link>
        </p>
      </div>
    </div>
  );
}
