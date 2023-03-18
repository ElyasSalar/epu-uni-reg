import { useEffect, useState } from "react"

const useScroll = () => {
  const [scroll, setScroll] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scroll
}

export default useScroll