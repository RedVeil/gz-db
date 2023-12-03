import React, { useState, useRef, useCallback, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const CENTER = {
  lat: 31.46117535900197,
  lng: 34.3978500366211,
}


function DraggableMarker() {
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState(CENTER)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          console.log(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      >    
    </Marker>
  )
}


const Map2 = () => {
  const [center, setCenter] = useState(CENTER)
  const ZOOM_LEVEL = 12
  const mapRef = useRef()

  return (
    <>
      <div className='container'>
        <div className='container'>
          <h1 className='text-center-mt-5'>OpenStreetMap Embeded</h1>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='container'>
              <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {location.loaded && !location.error && (
                  <Marker
                    position={[
                      location.coordinates.lat,
                      location.coordinates.lng,
                    ]}
                  ></Marker>
                )}
                <DraggableMarker/>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Map2