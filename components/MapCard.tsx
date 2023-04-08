import Image from "next/image"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"

import PinIcon from "../assets/icons/pin.svg"

import type { FC } from "react"
import type { MapPoint } from "../types/map"
import type { StaticImageData } from "next/image"
import Link from "next/link"
import { LIBRARIES_MAP_SCRIPT_OPTIONS } from "../shared/constants/map"

type MapCardProps = {
  href: string
  title: string
  location: string
  mapPoint: MapPoint
  image: StaticImageData
}

const MapCard: FC<MapCardProps> = ({
  location,
  mapPoint,
  image,
  title,
  href,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: LIBRARIES_MAP_SCRIPT_OPTIONS,
  })

  return (
    <div className="map-card">
      <div className="map-card__image-container">
        <Image
          src={image}
          priority={false}
          alt="map card image"
          className="map-card__image"
        />
      </div>
      <div className="map-card__container">
        <div className="map-card__content">
          <Link target="_blank" href={href} className="map-card__content-title">{title}</Link>
          <PinIcon className="map-card__content-icon" /><p className="map-card__content-location">{location}</p>
        </div>
        {isLoaded && (
          <GoogleMap
            options={{
              disableDefaultUI: true,
              clickableIcons: true,
              scrollwheel: false,
            }}
            zoom={14}
            center={mapPoint}
            mapContainerClassName="map-card__map"
            mapTypeId={google.maps.MapTypeId.ROADMAP}
          >
            <MarkerF position={mapPoint} />
          </GoogleMap>
        )}
      </div>
    </div>
  )
}

export default MapCard