import { useState, useEffect, Children } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Search = ({ search ,handleSearch, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <motion.div 
        className="searchbar flex flex-col items-center justify-center w-[40rem] absolute top-2 bg-white"
        data-isOpen={isOpen}
        layout
        transition={{ duration: .2}}
        style={{borderRadius: '2rem', borderWidth: '1px'}}
    >
        <motion.input
            type="text"
            className="searchbarInput w-[96%] px-4 py-2 rounded-full text-sm text-gray-600 outline-none pl-7"
            placeholder="Search country"
            value={search}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            layout
        />
        <motion.div layout className="searchResults w-full">
            {isOpen && (
            <>
                <motion.div 
                    layout
                    className="p-2 w-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .2, delay: .1 }}
                >
                    {children}
                </motion.div>
            </>
            )}
        </motion.div>
    </motion.div>
)};

const Country = ({country, setCountry, setSearch}) => {
    if (country.length > 10) {
      return (
        <motion.div layout>Too many matches, specify another filter</motion.div>
      );
    }
  
    const handleClick = (country) => {
      setCountry([country]);
      setSearch('');
    }
  
    if(country.length >= 1) {
      return (
        <motion.div
            layout
            className="flex flex-col gap-2 mb-1"
        >
          {country.map(country =>
            <motion.button 
                layout 
                onClick={() => handleClick(country)} 
                key={country.name.common}
                className="justify-between flex w-full items-center py-2 px-3 rounded-xl hover:bg-slate-200"
            >   
                <motion.div layout className="flex gap-2">
                    <img src={country.flags.png} alt={country.flags.alt} width="35" />
                    {country.name.common} ({country.capital}) 
                </motion.div>
                <motion.div layout>
                    {country.cioc} 
                </motion.div>
            </motion.button>
          )}
        </motion.div>
      )
    }
    
    return (
      <motion.div>Search any country!</motion.div>
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
            <Search search={search} handleSearch={handleSearch} >
                <Country country={country} setCountry={setCountry} setSearch={setSearch} />
            </Search>
            <div className="flex min-h-screen pt-14 flex-col w-[42rem]">
            </div>
            <div className="h-full border-l border-l-gray-200">
            </div>
        </motion.div>
    );
  }