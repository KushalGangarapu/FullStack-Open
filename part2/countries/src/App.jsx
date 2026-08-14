import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.error('Failed to fetch country data', error)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const trimmedSearch = search.trim().toLowerCase()
  const matchedCountries = trimmedSearch
    ? countries.filter(c =>
        c.name?.common?.toLowerCase().includes(trimmedSearch)
      )
    : []

  const renderContent = () => {
    if (!trimmedSearch) {
      return null
    }

    if (selectedCountry) {
      return <CountryDetail country={selectedCountry} />
    }

    if (matchedCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (matchedCountries.length > 1) {
      return (
        <CountryList
          countries={matchedCountries}
          onShowCountry={handleShowCountry}
        />
      )
    }

    if (matchedCountries.length === 1) {
      return <CountryDetail country={matchedCountries[0]} />
    }

    return <p>No matches found</p>
  }

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      {renderContent()}
    </div>
  )
}

export default App
