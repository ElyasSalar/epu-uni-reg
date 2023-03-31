import dynamic from "next/dynamic"

const NavBar = dynamic(() => import("./NavBar"), { ssr: false })
import Footer from "../components/Footer"

const Layout = ({ children }: { children: JSX.Element }) => (
  <>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout