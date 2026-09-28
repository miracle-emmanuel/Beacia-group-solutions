import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../data/siteConfig'

// London coordinates used as a placeholder pin — update to the real business location.
const DEFAULT_POSITION = { lat: 51.5009, lng: -0.1919 }
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

let mapsPromise = null
function loadGoogleMaps(apiKey) {
  if (mapsPromise) return mapsPromise
  mapsPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve(window.google.maps)
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=weekly`
    script.async = true
    script.onload = () => resolve(window.google.maps)
    script.onerror = reject
    document.head.appendChild(script)
  })
  return mapsPromise
}

export default function GoogleMap() {
  const mapRef = useRef(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!API_KEY) return
    let cancelled = false

    loadGoogleMaps(API_KEY)
      .then((maps) => {
        if (cancelled || !mapRef.current) return
        const map = new maps.Map(mapRef.current, {
          center: DEFAULT_POSITION,
          zoom: 14,
          mapId: 'BEACIA_MAP',
        })
        new maps.Marker({
          position: DEFAULT_POSITION,
          map,
          title: siteConfig.name,
        })
      })
      .catch(() => setError(true))

    return () => {
      cancelled = true
    }
  }, [])

  // If no API key is configured (or it fails to load), fall back to a
  // key-less embed so the map still renders out of the box.
  if (!API_KEY || error) {
    return (
      <iframe
        title="Beacia Group Solutions location"
        src={siteConfig.googleMapsEmbedSrc}
        className="h-full w-full rounded-2xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return <div ref={mapRef} className="h-full w-full rounded-2xl" />
}
