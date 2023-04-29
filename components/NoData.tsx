import { useTranslation } from "next-i18next"
import NotFoundIllustrationIcon from "../assets/icons/not-found-illustration.svg"

const NoData = () => {
  const { t } = useTranslation("common")

  return (
    <div className="no-data">
      <NotFoundIllustrationIcon className="no-data__icon" />
      <p className="no-data__description">{t("no_data_found")}</p>
    </div>
  )
}

export default NoData