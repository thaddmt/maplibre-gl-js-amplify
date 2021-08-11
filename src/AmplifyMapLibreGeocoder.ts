import { Geo } from "@aws-amplify/geo";

export const AmplifyGeocoderAPI = {
  forwardGeocode: async (config) => {
    const features = [];
    try {
      const data = await Geo.searchByText(config.query, {
        biasPosition: config.proximity,
        searchAreaConstraints: config.bbox,
        countries: config.countires,
        maxResults: config.limit,
      });

      if (data) {
        data.forEach((result) => {
          const { geometry, ...otherResults } = result;
          features.push({
            type: "Feature",
            geometry: { type: "Point", coordinates: geometry.point },
            properties: { ...otherResults },
            place_name: otherResults.label,
            text: otherResults.label,
            center: geometry.point,
          });
        });
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }

    return { features };
  },
  reverseGeocode: async (config) => {
    const features = [];
    try {
      const data = await Geo.searchByCoordinates(config.query, {
        maxResults: config.limit,
      });

      if (data && data.geometry) {
        const { geometry, ...otherResults } = data;
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: geometry.point },
          properties: { ...otherResults },
          place_name: otherResults.label,
          text: otherResults.label,
          center: geometry.point,
        });
      }
    } catch (e) {
      console.error(`Failed to reverseGeocode with error: ${e}`);
    }

    return { features };
  },
};