import axios from "axios";
import { useState, useEffect } from "react";

const api_key = import.meta.env.VITE_SOME_KEY

const ShowWeather = ({country}) =>{
  const [weatherSet, setWeatherSet] = useState(null)

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.cca2}&appid=${api_key}`)
    .then(response => {
      setWeatherSet(response.data)
    })
  },[country])
  if(weatherSet===null){
    return null
  }
  
  return(
    <div>
      <p>Temperature: {((weatherSet.main.temp-273.15).toFixed(2)).toString()} &#8451; </p>
      <img src={`https://openweathermap.org/img/wn/${weatherSet.weather[0].icon}@2x.png`} alt="" />
      <p>Wind: {`${weatherSet.wind.speed} m/s`}</p>
    </div>
  )
}

const CountryResults = ({ countries, showButton }) => {
  if (!countries || countries.length === 0) {
    return <p>No Results</p>;
  } else if (countries.length > 10) {
    return (
    <p>Too Many Matches, Filter More</p>
  );
  } else if (countries.length > 1 && countries.length <= 10){
    return (
      <ul>
        {countries.map((country) => {
          return <li key={country.cca3}>{country.name.common}<button value={country.name.common} onClick={showButton}>Show</button></li>
        })}
      </ul>
    );
  } else if(countries.length === 1) {
    const country = countries[0]
    return(
    <div>
      <h1>{country.name.common}</h1>
      <img className="flagImage" src={country.flags.svg} alt="Input Country's Flag" />
      <p>Official Name: {country.name.official} <br /> Capital: {country.capital} <br />Area: {country.area} km&sup2;</p>
      <h2>Languages:</h2>
      <ul>
      {Object.values(country.languages).map(language =>{
        return<li key={`${country.cca3}${language}`}>{language}</li>
      })}
      </ul>
      <h2>Weather in {country.capital}</h2>
      <ShowWeather country = {country}/>
    </div>
    )
  } else {
    return <h1>ERROR IN DATA PARSING</h1>
  }
};

function App() {
  const [finder, setFinder] = useState("");
  const [fullCountryList, setFullCountryList] = useState(null);
  const [filteredCountryList, setFilteredCountryList] = useState(fullCountryList);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setFullCountryList(response.data)
        setFilteredCountryList(response.data)
  });
  }, []);


  const handleFinder = (event) => {
    const eventResult = event.target.value;
    setFinder(eventResult);

    setFilteredCountryList(() => {
      return fullCountryList.filter((country) =>
        country.name.common.toLowerCase().includes(eventResult.toLowerCase())
      );
    });
  };

  const showButton = (event) =>{
    setFinder(event.target.value)
    handleFinder(event)
  }


  if (!fullCountryList) {
    return null;
  }
  return (
    <>
      <p>
        Find Countries{" "}
        <input type="text" onChange={handleFinder} value={finder} />
      </p>
      <CountryResults showButton={showButton} countries={filteredCountryList} />
    </>
  );
}

export default App;
