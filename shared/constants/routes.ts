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
  students: {
    name: "students",
    path: "/students",

    login: {
      name: "login",
      path: "/students/login",
    },

    details: {
      name: "details",
      path: "/students/:studentId",
    }
  }
}