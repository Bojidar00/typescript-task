interface CountryName {
  common: string
  official: string
}

export interface Country {
  name: CountryName
  capital: string[]
}
