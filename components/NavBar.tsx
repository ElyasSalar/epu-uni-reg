import Link from "next/link"
import classNames from "classnames"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import useScroll from "../shared/hooks/useScroll"
import { LOCALES } from "../shared/constants/locale"
import { useLayoutEffect, useRef, useState } from "react"
import { NAVBAR_ITEMS } from "../shared/constants/components/navbar"

import LanguagesIcon from "../assets/icons/languages.svg"
import HamburgerIcon from "../assets/icons/hamburger.svg"
import CrossIcon from "../assets/icons/cross.svg"

import type { Locale } from "../types/locales"

const NavBar = () => {
  const activeLink = useRef<HTMLLIElement>(null)
  const linkIndicator = useRef<HTMLDivElement>(null)
  const scroll = useScroll()

  const { t } = useTranslation("common")
  const { locale, asPath, route } = useRouter()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  
  const changeLocaleTo: Locale = locale === LOCALES.CKB ? LOCALES.EN : LOCALES.CKB

  const togglerClickHandler = (): void => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }

  const linkClickHandler = (): void => {
    if (!isExpanded) return
    setIsExpanded(false)
  }

  useLayoutEffect(() => {
    const indicatorElement = linkIndicator.current as HTMLDivElement
    const activeLinkElement = activeLink.current as HTMLLIElement
    
    const mutationObserver = new ResizeObserver(() => {
      const { width, left, bottom } = activeLinkElement.getBoundingClientRect()
      indicatorElement.style.top = `${bottom + 20}px`
      indicatorElement.style.width = `${width}px`
      indicatorElement.style.left = `${left}px`
    })
    
    mutationObserver.observe(activeLinkElement)
    return () => mutationObserver.unobserve(activeLinkElement)
  }, [route, locale])
  
  return (
    <nav
      className={classNames(
        "navbar",
        { "navbar--scrolled": scroll > 50 },
      )}
    >
      <Link className="navbar__language" href={asPath} locale={changeLocaleTo}>
        <LanguagesIcon className="navbar__language-icon" />
        {t("nav_language")}
      </Link>
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={togglerClickHandler}
        aria-label="Toggle navigation"
        className="button button--secondary navbar__toggler"
      >
        <HamburgerIcon className="navbar__toggler-icon" />
      </button>
      <ul
        className={classNames("navbar__items", {
          "navbar__items--expanded": isExpanded
        })}
      >
        {NAVBAR_ITEMS.map(({ id, href, translationKey }) => (
          <li
            key={id}
            ref={route.includes(href) ? activeLink : null}
            className={classNames("navbar__item", {
              "navbar__item--active": route === href
            })}
          >
            <Link className="nav-link" href={href} onClick={linkClickHandler}>
              {t(translationKey)}
            </Link>
          </li>
        ))}

        <CrossIcon className="button button--secondary navbar__close-toggle" onClick={togglerClickHandler} />
      </ul>
      <div className="navbar__item-indicator" ref={linkIndicator} />
    </nav>
  )
}

export default NavBar