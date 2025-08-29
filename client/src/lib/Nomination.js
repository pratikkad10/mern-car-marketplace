export const reverseGeocode = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    )
    const data = await res.json()

    if (!data.address) return null

    // Pick important fields in order
    const { suburb, town, village, city, state, country } = data.address

    const formattedLocation = [
      suburb || town || village || "", // Locality
      city || "",                      // City
      state || "",                     // State
      country || ""                    // Country
    ]
      .filter(Boolean) // Remove empty ones
      .join(", ")

    return { formattedLocation, address: data.address }
  } catch (err) {
    console.error("Reverse geocode error:", err)
    return null
  }
}
