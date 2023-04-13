import { LOCALES } from "../shared/constants/locale"

const MAP_LATIN_TO_ARABIC: {
  [key: string]: string
} = {
  "\u0030": "\u0660",
  "\u0031": "\u0661",
  "\u0032": "\u0662",
  "\u0033": "\u0663",
  "\u0034": "\u0664",
  "\u0035": "\u0665",
  "\u0036": "\u0666",
  "\u0037": "\u0667",
  "\u0038": "\u0668",
  "\u0039": "\u0669",
}

const MAP_ARABIC_TO_LATIN: {
  [key: string]: string
} = {
  "\u0660": "\u0030",
  "\u0661": "\u0031",
  "\u0662": "\u0032",
  "\u0663": "\u0033",
  "\u0664": "\u0034",
  "\u0665": "\u0035",
  "\u0666": "\u0036",
  "\u0667": "\u0037",
  "\u0668": "\u0038",
  "\u0669": "\u0039",
}

export const translateNumber = (number: number | string, locale: string): string => {
  return number.toString().split("").map((char: string): string => {
    if (locale === LOCALES.CKB) {
      return MAP_LATIN_TO_ARABIC[char] || char
    }
    return MAP_ARABIC_TO_LATIN[char] || char
  }).join("")
}