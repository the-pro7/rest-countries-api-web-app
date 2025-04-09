export interface CountryType {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital: string
  altSpellings: string[]
  subregion: string
  region: string
  population: number
  latlng: number[]
  demonym: string
  area?: number
  gini?: number
  timezones: string[]
  borders: string[]
  nativeName: string
  numericCode: string
  flags: {
    svg: string
    png: string
  }
  currencies: {
    code: string
    name: string
    symbol: string
  }[]
  languages: {
    iso639_1: string
    iso639_2: string
    name: string
    nativeName: string
  }[]
  translations: {
    [key: string]: string
  }
  flag: string
  regionalBlocs: {
    acronym: string
    name: string
    otherNames: string[]
  }[]
  cioc: string
  independent: boolean

  // Other types not known or relevant
  [key: string]: unknown
}
