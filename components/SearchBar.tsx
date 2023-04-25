import { useState } from "react"
import classNames from "classnames"

import MagnifyIcon from "../assets/icons/magnify.svg"

import type  { FC, ChangeEventHandler } from "react"

type SearchBarProps = {
  onSearch: (searchValue: string) => void
  placeholder?: string
  disabled?: boolean
}

const SearchBar: FC<SearchBarProps> = ({
  disabled = false,
  placeholder,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearchSubmit: ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onSearch(searchValue)
  }

  return (
    <form
      data-testid="search-bar"
      onSubmit={handleSearchSubmit}
      className={classNames("search-bar", {
        "search-bar--disabled": disabled,
      })}
    >
      <label htmlFor="search-bar-input" className="search-bar__wrapper">
        <MagnifyIcon className="search-bar__magnify" />
        <input
          type="text"
          autoComplete="off"
          disabled={disabled}
          value={searchValue}
          id="search-bar-input"
          placeholder={placeholder}
          className="search-bar__input"
          data-testid="search-bar-input"
          onChange={handleSearchChange}
        />
      </label>
    </form>
  )
}

export default SearchBar