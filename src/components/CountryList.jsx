import { motion } from 'framer-motion';

const Country = ({country, handleCountryClick, setIsOpen}) => {
    if (country.length > 10) {
      return (
        <motion.div layout>Too many matches, keep typing!</motion.div>
      );
    }

    const handleClick = (country) => {
        console.log(country)
        handleCountryClick(country);
        setIsOpen(false);
    }
  
    if(country.length >= 1) {
      return (
        <motion.div
            layout
            className="flex flex-col gap-2 mb-1"
        >
          {country.map(country =>
            <button 
                onClick={() => handleClick(country)} 
                key={country.name.common}
                className="justify-between flex w-full items-center py-2 px-3 rounded-xl hover:bg-slate-200"
            >   
                <motion.div layout className="flex gap-2 items-center">
                    <img className="skeleton rounded-sm" src={country.flags.png} alt={country.flags.alt} width="35" />
                    {country.name.common} ({country.capital}) 
                </motion.div>
                <motion.div layout>
                    {country.cioc} 
                </motion.div>
            </button>
          )}
        </motion.div>
      )
    }
    
    return (
      <motion.div 
        layout
      >
        Search any valid country!
      </motion.div>
    );
  }

export default Country;