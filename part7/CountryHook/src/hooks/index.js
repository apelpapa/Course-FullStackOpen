import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    type,
    name,
    onChange,
    value,
  };
};

export const useCountry = (filterField) => {
  const [allCountries, setAllCountries] = useState(null);
  const [matchedCountry, setMatchedCountry] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      const response = await axios.get(
        "https://studies.cs.helsinki.fi/restcountries/api/all"
      );
      setAllCountries(response.data);
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (allCountries && filterField.value) {
      const filteredCountries = allCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(filterField.value.toLowerCase());
      });

      if (filteredCountries.length > 1) {
        setNoMatch(false);
        setMatchedCountry(false);
      } else if (filteredCountries.length === 1) {
        const getCountry = async () => {
          const response = await axios.get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0].name.common}`
          );
          setMatchedCountry(response.data);
        };
        getCountry();
      } else {
        setMatchedCountry(false);
        setNoMatch(true);
      }
    }
  }, [filterField.value, allCountries]);

  return {
    matchedCountry,
    noMatch,
  };
};
