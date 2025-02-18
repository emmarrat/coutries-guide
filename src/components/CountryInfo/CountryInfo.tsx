import {useEffect, useState} from 'react';
import {IFullCountry, IFullCountryUpdated, IShortCountry} from '../../types.ts';
import {BASE_URL} from '../../constants.ts';

interface Props {
  shortName: string;
}

const CountryInfo = ({shortName}: Props) => {
  const [countryInfo, setCountryInfo] = useState<IFullCountryUpdated | null>(null);

  useEffect(() => {
    const getCountry = async (countryName: string) => {
      try {
        const response = await fetch(`${BASE_URL}/alpha/${countryName}`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data: IFullCountry = await response.json();
        console.log('Full country =', data);
        // setCountryInfo(data)
      } catch (error) {
        console.error('Ошибка запроса:', error);
        return [];
      }
    };
    if (shortName) {
      void getCountry(shortName);
    }
  }, [shortName]);

  return (
    <div>
      hello
    </div>
  );
};

export default CountryInfo;