import type { CountryType } from '../types/countryType'

const numberFormatter = (number: number): string => {
  return new Intl.NumberFormat('en', { style: 'decimal' }).format(number)
}

const shortenName = (countryName: string): string => {
  const MAX_LENGTH = 25
  return countryName.length > MAX_LENGTH
    ? countryName.substring(0, MAX_LENGTH) + '...'
    : countryName
}

const getBorderCountries = (
  borderCountries: string[],
  allCountries: CountryType[]
): CountryType[] => {
  return borderCountries
    ?.map(item =>
      allCountries.find(countryItem => countryItem.alpha3Code === item)
    )
    .filter((country): country is CountryType => Boolean(country)) // filter undefined items out and assign CountryType to what's left after filtering
  // .filter(Boolean) is the cool trick that ensure we don't get any undefined items in our list
}

const log = (...args: unknown[]) => console.log('[LOG]:', ...args)

export { numberFormatter, shortenName, getBorderCountries, log }
