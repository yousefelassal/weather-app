import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Search = ({ search ,handleSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <motion.div 
        className="searchbar flex flex-col items-center justify-center w-[40rem] absolute top-2 bg-white"
        data-isOpen={isOpen}
        layout
        style={{borderRadius: '2rem', borderWidth: '1px'}}
    >
        <motion.input
            type="text"
            className="w-full px-4 py-2 rounded-full text-sm text-gray-600 outline-none"
            placeholder="Search country"
            value={search}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            layout
        />
        <motion.div layout className="searchResults">
            {isOpen && (
               <motion.ul layout className="p-2">
                     <li>Search Result 1</li>
                     <li>Search Result 1</li>
                     <li>Search Result 1</li>
                     <li>Search Result 1</li>
                     <li>Search Result 1</li>
                     <li>Search Result 1</li>
               </motion.ul>
            )}
        </motion.div>
    </motion.div>
)};

const Country = ({country, setCountry, setSearch}) => {
    if (country.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      );
    }
  
    const handleClick = (country) => {
      setCountry([country]);
      setSearch('');
    }
  
    if(country.length > 1) {
      return (
        <div>
          {country.map(country =>
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleClick(country)}>show</button>
            </div>
          )}
        </div>
      )
    }
    if(country.length === 1) {
      const languages = Object.values(country[0].languages);
      return (
        <div>
          <h2>{country[0].name.common} ({country[0].cioc})</h2>
          <div>capital {country[0].capital}</div>
          <div>population {country[0].population}</div>
          <div>area {country[0].area} </div>
          <div>{country[0].subregion}, {country[0].region}</div>
  
          <h3>languages</h3>
          <ul>
            {languages.map(language => <li key={language}>{language}</li>)}
          </ul>
  
          <img src={country[0].flags.png} alt={country[0].flags.alt} width="250" />
          <img src={country[0].coatOfArms.png} alt="coat of arm" width="250" />
  
        </div>
      );
    }
    return (
      <div>Search any valid country!</div>
    );
  }

export default function Index() {
    const [search, setSearch] = useState(null);
    const [country, setCountry] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data);
        });
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        if (search) {
            const result = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
            setCountry(result);
        }
    }, [search, countries]);

    return (
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .15 }}
        className="h-full flex"
        >
            <Search search={search} handleSearch={handleSearch} />
            <div className="flex min-h-screen mt-14 flex-col w-[42rem]">
                <Country country={country} setCountry={setCountry} setSearch={setSearch} />
            </div>
            <div className="h-full border-l border-l-gray-200">
            </div>
        </motion.div>
    );
  }