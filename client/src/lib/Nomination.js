export const reverseGeocode = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    console.log(data);

    const city = data?.address?.city || data?.address?.town || data?.address?.village;
    const state = data?.address?.state;
    const country = data?.address?.country;

    return { city, state, country };
  } catch (err) {
    console.error("Reverse geocoding failed", err);
    return null;
  }
};
