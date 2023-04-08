import { MapPoint } from "../../types/map"

import ctiImage from "../../assets/images/cti.jpg"
import ethmcImage from "../../assets/images/ethmc.jpg"
import etacImage from "../../assets/images/etac.jpg"
import etaiImage from "../../assets/images/etai.jpg"
import etcImage from "../../assets/images/etc.jpg"
import etecImage from "../../assets/images/etec.jpg"
import etmiImage from "../../assets/images/etmi.jpg"
import ktiImage from "../../assets/images/kti.jpg"
import mtiImage from "../../assets/images/mti.jpg"
import stcImage from "../../assets/images/stc.jpg"

import type { StaticImageData } from "next/image"

export const LIBRARIES_MAP_SCRIPT_OPTIONS: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ["places"]

export const ERBIL_TECHNICAL_ADMINISTRATIVE_COLLAGE = "ERBIL_TECHNICAL_ADMINISTRATIVE_COLLAGE"
export const ERBIL_TECHNICAL_ENGINEERING_COLLAGE = "ERBIL_TECHNICAL_ENGINEERING_COLLAGE"
export const ERBIL_TECHNICAL_HEALTH_AND_MEDICAL_COLLEGE = "ERBIL_TECHNICAL_HEALTH_AND_MEDICAL_COLLEGE"
export const ERBIL_TECHNOLOGY_COLLAGE = "ERBIL_TECHNOLOGY_COLLAGE"
export const SHAQLAWA_TECHNICAL_COLLAGE = "SHAQLAWA_TECHNICAL_COLLAGE"

export const ERBIL_TECHNICAL_ADMINISTRATION_INSTITUTE = "ERBIL_TECHNICAL_ADMINISTRATION_INSTITUTE"
export const ERBIL_TECHNICAL_MEDICAL_INSTITUE = "ERBIL_TECHNICAL_MEDICAL_INSTITUE"
export const KOYA_TECHNICAL_INSTITUE = "KOYA_TECHNICAL_INSTITUE"
export const MERGASOR_TECHNICAL_INSTITUE = "MERGASOR_TECHNICAL_INSTITUE"
export const KHABAT_TECHNICAL_INSTITUE = "KHABAT_TECHNICAL_INSTITUE"
export const CHOMAN_TECHNICAL_INSTITUE = "CHOMAN_TECHNICAL_INSTITUE"

export const EPU_COLLAGES = [
  ERBIL_TECHNICAL_ADMINISTRATIVE_COLLAGE,
  ERBIL_TECHNICAL_ENGINEERING_COLLAGE,
  ERBIL_TECHNICAL_HEALTH_AND_MEDICAL_COLLEGE,
  ERBIL_TECHNOLOGY_COLLAGE,
  SHAQLAWA_TECHNICAL_COLLAGE,
] as const

export const EPU_INSTITUTES = [
  ERBIL_TECHNICAL_ADMINISTRATION_INSTITUTE,
  ERBIL_TECHNICAL_MEDICAL_INSTITUE,
  KOYA_TECHNICAL_INSTITUE,
  MERGASOR_TECHNICAL_INSTITUE,
  KHABAT_TECHNICAL_INSTITUE,
  CHOMAN_TECHNICAL_INSTITUE,
] as const

type EpuCollage = typeof EPU_COLLAGES[number]
type EpuInstitutes = typeof EPU_INSTITUTES[number]

export const EPU_COLLAGES_AND_INSTITUTES_LAT_AND_LNG: {
  [key in EpuCollage | EpuInstitutes]: MapPoint
} = {
  [ERBIL_TECHNICAL_ADMINISTRATIVE_COLLAGE]: {
    lat: 36.14285090999101,
    lng: 44.037011405914015,
  },
  [ERBIL_TECHNICAL_ENGINEERING_COLLAGE]: {
    lat: 36.14285090999101,
    lng: 44.037011405914015,
  },
  [ERBIL_TECHNICAL_HEALTH_AND_MEDICAL_COLLEGE]: {
    lat: 36.14521762008899,
    lng: 44.01553325568382,
  },
  [ERBIL_TECHNOLOGY_COLLAGE]: {
    lat: 36.145803752225824,
    lng: 44.01787677577495,
  },
  [SHAQLAWA_TECHNICAL_COLLAGE]: {
    lat: 36.40670921163143,
    lng: 44.311301542194805,
  },
  [ERBIL_TECHNICAL_ADMINISTRATION_INSTITUTE]: {
    lat: 36.14428188940176,
    lng: 44.01582295198923,
  },
  [ERBIL_TECHNICAL_MEDICAL_INSTITUE]: {
    lat: 36.145096133643186,
    lng: 44.01549535206311,
  },
  [KOYA_TECHNICAL_INSTITUE]: {
    lat: 36.07481372644278,
    lng: 44.63699371335314,
  },
  [MERGASOR_TECHNICAL_INSTITUE]: {
    lat: 36.82769248466728,
    lng: 44.31673799927274,
  },
  [KHABAT_TECHNICAL_INSTITUE]: {
    lat: 36.265433793456346,
    lng: 43.65429605568632,
  },
  [CHOMAN_TECHNICAL_INSTITUE]: {
    lat: 36.63702883163049,
    lng: 44.875067818440264,
  },
}

export const MAP_COLLAGES_AND_INSTITUTES_INFO: {
  [key in EpuCollage | EpuInstitutes]: {
    name: string
    address: string
    image: StaticImageData
  }
} = {
  [ERBIL_TECHNICAL_ADMINISTRATIVE_COLLAGE]: {
    image: etacImage,
    name: "locations_erbil_technical_administrative_college_name",
    address: "locations_erbil_technical_administrative_college_address",
  },
  [ERBIL_TECHNICAL_ENGINEERING_COLLAGE]: {
    image: etecImage,
    name: "locations_erbil_technical_engineering_college_name",
    address: "locations_erbil_technical_engineering_college_address",
  },
  [ERBIL_TECHNICAL_HEALTH_AND_MEDICAL_COLLEGE]: {
    image: ethmcImage,
    name: "locations_erbil_technical_health_college_name",
    address: "locations_erbil_technical_health_college_address",
  },
  [ERBIL_TECHNOLOGY_COLLAGE]: {
    image: etcImage,
    name: "locations_erbil_technology_college_name",
    address: "locations_erbil_technology_college_address",
  },
  [SHAQLAWA_TECHNICAL_COLLAGE]: {
    image: stcImage,
    name: "locations_shaqlawa_technical_college_name",
    address: "locations_shaqlawa_technical_college_address",
  },
  [ERBIL_TECHNICAL_ADMINISTRATION_INSTITUTE]: {
    image: etaiImage,
    name: "locations_erbil_technical_administration_institute_name",
    address: "locations_erbil_technical_administration_institute_address",
  },
  [ERBIL_TECHNICAL_MEDICAL_INSTITUE]: {
    image: etmiImage,
    name: "locations_erbil_technical_medical_institute_name",
    address: "locations_erbil_technical_medical_institute_address",
  },
  [KOYA_TECHNICAL_INSTITUE]: {
    image: ktiImage,
    name: "locations_koye_technical_institute_name",
    address: "locations_koye_technical_institute_address",
  },
  [MERGASOR_TECHNICAL_INSTITUE]: {
    image: mtiImage,
    name: "locations_mergasor_technical_institute_name",
    address: "locations_mergasor_technical_institute_address",
  },
  [KHABAT_TECHNICAL_INSTITUE]: {
    image: ktiImage,
    name: "locations_khabat_technical_institute_name",
    address: "locations_khabat_technical_institute_address",
  },
  [CHOMAN_TECHNICAL_INSTITUE]: {
    image: ctiImage,
    name: "locations_choman_technical_institute_name",
    address: "locations_choman_technical_institute_address",
  },
}