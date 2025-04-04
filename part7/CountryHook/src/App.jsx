import React, { useState, useEffect } from "react";
import { useField, useCountry } from "./hooks";
import Country from "./components/Country";

const App = () => {
  const filterField = useField();
  const countries = useCountry(filterField)

  return (
    <div>
      <input {...filterField} />
      <div>
        {!countries.noMatch && !countries.matchedCountry ? (
          <p>Keep Typing, Too Many Results</p>
        ) : null}
        {countries.noMatch && !countries.matchedCountry ? <p>No Results, Try Again</p> : null}
        {countries.matchedCountry ? <p>Found Match!</p> : null}
      </div>
      {countries.matchedCountry ? <Country country={countries.matchedCountry} /> : null}
    </div>
  );
};

export default App;
