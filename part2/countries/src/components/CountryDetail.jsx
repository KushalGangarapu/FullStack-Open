import Weather from './Weather'

const CountryDetail = ({ country }) => {
  const name = country.name?.common || 'Country'
  const capital = country.capital?.[0] || 'N/A'
  const area = country.area
  const languages = country.languages ? Object.values(country.languages) : []
  const flagUrl = country.flags?.png || country.flags?.svg
  const flagAlt = country.flags?.alt || `Flag of ${name}`
  const latlng = country.capitalInfo?.latlng || country.latlng

  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>

      <h3>languages:</h3>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      {flagUrl && (
        <img
          src={flagUrl}
          alt={flagAlt}
          style={{ width: '150px', border: '1px solid #ddd', marginTop: '10px' }}
        />
      )}

      {capital !== 'N/A' && <Weather capital={capital} latlng={latlng} />}
    </div>
  )
}

export default CountryDetail
