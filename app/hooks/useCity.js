/*
* useCity.js
* Author: Sagar A. Chitnis
* Purpose: Custom hook to get the location details of the user. Prompts for permission
*          if required
*/

import * as Location from 'expo-location'
import { useState, useEffect } from 'react'

const useCity = (lat, long) => {
    // console.log('yoo' + lat, long)

    //Handle received location
    const [location, setLocation] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    useEffect(() => {
        getCity();
    }, [])

    // Ask for user permission for location access
    const getCity = async () => {
        try {
            const { granted } = await Location.requestPermissionsAsync();
            if (!granted) {
                alert('Location permission required')
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location)

            const place = await Location.reverseGeocodeAsync({
                latitude: lat,
                longitude: long
            });

            let city;
            place.find(p => {
                city = p.city
                setCity(p.city)
            });
            let country;
            place.find(p => {
                country = p.country
                setCountry(p.country)
            });
        } catch (error) {
            //console.log(error);
        }

    }
    //console.log(city)

    return { city, country, location }
};

export default useCity;