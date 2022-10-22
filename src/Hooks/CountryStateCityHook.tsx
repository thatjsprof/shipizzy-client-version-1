import { ICountry, IState, ICity } from "country-state-city/dist/lib/interface";
import { IPayloadType } from "Components/UI/Select/Select.component";
import { Country, State, City } from "country-state-city";
import React, { useState, useEffect } from "react";
import { instanceOf } from "Utils/Helpers";

interface IProps {
  state: string;
  country: string;
}

const useCountryStateCityHook = ({ state, country }: IProps) => {
  const [cities, setCities] = useState<IPayloadType[]>([]);
  const [states, setStates] = useState<IPayloadType[]>([]);
  const [countries, setCountries] = useState<IPayloadType[]>([]);

  const extractValues = (value: ICountry | IState | ICity) => {
    if (instanceOf<ICountry | IState>(value, "isoCode")) {
      return {
        value: value.isoCode,
        text: value.name,
      };
    } else {
      return {
        value: value.name,
        text: value.name,
      };
    }
  };

  useEffect(() => {
    setCountries(
      Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        text: country.name,
      }))
    );
  }, []);

  useEffect(() => {
    if (country && state) {
      setCities(City.getCitiesOfState(country, state).map(extractValues));
    }
  }, [country, state]);

  useEffect(() => {
    if (country) {
      setStates(State.getStatesOfCountry(country).map(extractValues));
    }
  }, [country]);

  return {
    countries,
    states,
    cities,
  };
};

export default useCountryStateCityHook;
