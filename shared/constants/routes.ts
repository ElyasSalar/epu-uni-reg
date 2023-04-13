export const ROUTES = {
  home: {
    name: "home",
    path: "/",
  },
  instructions: {
    name: "instructions",
    path: "/instructions",

    howToRegister: {
      name: "how-to-register",
      path: "/instructions/how-to-register",
    },
  },
  onlineRegistration: {
    name: "registration",
    path: "/registration",
  },
  locations: {
    name: "locations",
    path: "/locations",
  },
  qa: {
    name: "qa",
    path: "/qa",
  },
}

const HOSTNAME = process.env.NEXT_PUBLIC_VERCEL_URL

export const BASE_URL = `http://${HOSTNAME}`