import Link from "next/link"
import { useTranslation } from "next-i18next"
import { NAVBAR_ITEMS } from "../shared/constants/components/navbar"

import FacebookIcon from "../assets/icons/facebook.svg"
import InstagramIcon from "../assets/icons/instagram.svg"

const Footer = () => {
  const { t } = useTranslation("common")

  return (
    <footer className="footer">
      <div className="footer__links">
        <div className="footer__links-empty" />
        <div className="footer__links-pages">
          {NAVBAR_ITEMS.map(({ id, href, translationKey }) => (
            <Link key={id} href={href}>{t(translationKey)}</Link>
          ))}
        </div>
        <div className="footer__links-accounts">
          <a className="footer__links-accounts-icon" target="_blank" rel="noreferrer" href="https://www.facebook.com/epu.education">
            <FacebookIcon />
          </a>
          <a className="footer__links-accounts-icon" target="_blank" rel="noreferrer" href="https://www.instagram.com/erbil_polytechnic_university_/">
            <InstagramIcon />
          </a>
        </div>
      </div>
      <div className="footer__divider" />
      <div className="footer__info">
        <a href="mailto:info@epu.edu.iq" className="footer__info-email">
          Email: info@epu.edu.iq
        </a>
        <p className="footer__info-phone">@{new Date().getFullYear()} made with ❤️ by BlueBit</p>
      </div>
    </footer>
  )
}

export default Footer