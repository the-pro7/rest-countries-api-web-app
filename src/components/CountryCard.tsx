import { numberFormatter, shortenName} from "../../helpers/helpers";
import { Link } from "react-router";

interface CountryCardProps {
  image: string;
  countryName: string;
  population: number;
  region: string;
  capital: string;
}

export default function CountryCard({
  image,
  countryName,
  population,
  region,
  capital,
}: CountryCardProps) {
  return (

   <Link to={`/country/${countryName}`}>
     <div className="h-[370px] w-[300px] bg-white text-[var(--color-dark-blue)] dark:bg-[var(--color-dark-blue)] dark:text-[var(--white)] rounded-md shadow-md overflow-clip">
      <div className="w-full h-[170px] flex justify-center items-center bg-white">
        <img
          src={image}
          alt={`${countryName} image`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-7 ">
        <h2 className="text-xl font-extrabold mb-2">{shortenName(countryName)}</h2>
      <div className="flex flex-col gap-2">
      <p className="font-semibold">
          Population:{" "}
          <span className="font-light">{numberFormatter(population)}</span>
        </p>
        <p className="font-semibold">
          Region: <span className="font-light">{region}</span>
        </p>
        <p className="font-semibold">
          Capital: <span className="font-light">{capital ? capital : "Unknown"}</span>
        </p>
      </div>
      </div>
    </div>
   </Link>
  );
}
