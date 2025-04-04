const Country = (country) => {
  return (
    <div>
      <h3>{country.country.name.common} </h3>
      <div>Capital {country.country.capital} </div>
      <div>Population {country.country.population}</div>
      <img
        style={{border:'solid 1px'}}
        src={country.country.flags.png}
        height="100"
        alt={`flag of ${country.country.name.common}`}
      />
    </div>
  );
};

export default Country