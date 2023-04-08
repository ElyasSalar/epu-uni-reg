import type { MapPoint } from "../types/map"

export const redirecToMap = (location: MapPoint): string => {
  const mapUrl = new URL("http://maps.google.com/maps")
  mapUrl.searchParams.set("z", "14")
  mapUrl.searchParams.set("t", "m")
  mapUrl.searchParams.set("q", `loc:${location.lat},${location.lng}`)
  
  return mapUrl.href
}