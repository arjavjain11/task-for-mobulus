import axios from "axios";

const MAPBOX_API_KEY = 'YOUR_MAPBOX_API_KEY';
const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

async function getCoordinates(cityName) {
  try {
    const response = await axios.get(`${BASE_URL}/${cityName}.json`, {
      params: {
        access_token: MAPBOX_API_KEY,
      },
    });

    if (response.data.features.length > 0) {
      const location = response.data.features[0].center;
      return location;
    } else {
      return (`Coordinates for ${cityName} not found.`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

export {
    getCoordinates
}
