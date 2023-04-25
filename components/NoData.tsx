import NotFoundIllustrationIcon from "../assets/icons/not-found-illustration.svg"

const NoData = () => {
  return (
    <div className="no-data">
      <NotFoundIllustrationIcon className="no-data__icon" />
      <p className="no-data__description">No Data Found!</p>
    </div>
  )
}

export default NoData