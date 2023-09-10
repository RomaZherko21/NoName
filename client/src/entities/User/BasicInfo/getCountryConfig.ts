interface CountriesType {
  name: string
  country: string
  phoneCode: string
  phoneRegex: string
  //   suggested?: boolean
}

export const getCountryConfig: readonly CountriesType[] = [
  {
    name: 'Afghanistan',
    country: 'AF',
    phoneCode: '+93',
    phoneRegex: '^\\+93\\d{9}$'
  },
  {
    name: 'Albania',
    country: 'AL',
    phoneCode: '+355',
    phoneRegex: '^\\+355\\d{8,9}$'
  },
  {
    name: 'Algeria',
    country: 'DZ',
    phoneCode: '+213',
    phoneRegex: '^\\+213\\d{9}$'
  }
]
