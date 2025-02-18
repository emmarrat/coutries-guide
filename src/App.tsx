import './App.css';
import {useEffect, useState} from 'react';
import {IShortCountry} from './types.ts';
import {BASE_URL} from './constants.ts';
import CountriesList from './components/CoutriesList/CountriesList.tsx';
import CountryInfo from './components/CountryInfo/CountryInfo.tsx';

function App() {
  const [countries, setCountries] = useState<IShortCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/all?fields=alpha3Code,name`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data: IShortCountry[] = await response.json();
        setCountries(data)
      } catch (error) {
        console.error('Ошибка запроса:', error);
        return [];
      }
    };
    void getCountries()
  }, []);

  return (
    <div>
      <CountriesList countries={countries} onSelectCountry={setSelectedCountry}/>
      <CountryInfo shortName={selectedCountry}/>
    </div>
  );
}

export default App;
