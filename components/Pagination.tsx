import ReactPaginate from "react-paginate"

import type { FC } from "react"

type PaginationProps = {
  totalPages: number
  setPage: (page: { selected: number }) => void
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  setPage,
}) => {

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={setPage}
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="pagination__page"
      pageLinkClassName="pagination__page-link"
      nextClassName="pagination__next"
      nextLinkClassName="pagination__next-link"
      breakClassName="pagination__break"
      breakLinkClassName="pagination__break-link"
      previousClassName="pagination__previous"
      previousLinkClassName="pagination__previous-link"
      activeClassName="pagination__page--active"
      activeLinkClassName="pagination__page-link--active"
    />
  )
}

export default Pagination