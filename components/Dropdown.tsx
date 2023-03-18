import classNames from "classnames"
import { useState, useRef, useCallback } from "react"
import useClickOutside from "../shared/hooks/useClickOutside"
import { DropdownOption, DropdownProps } from "../types/dropdown"

import ChevronDownIcon from "../assets/icons/chevron-down.svg"

import type { FC } from "react"

const Dropdown: FC<DropdownProps> = ({
  id,
  label,
  options,
  selected,
  disabled,
  onChange,
  isErrored,
  helperText,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = useCallback(() => setIsOpen(false), [])
  useClickOutside(dropdownRef, handleOutsideClick)

  const chosenPlaceholder = selected === undefined ? placeholder : selected.text

  const handleSelectedClick = () => {
    setIsOpen(prev => !prev)
  }

  const handleSelectionClick = (option: DropdownOption) => () => {
    setIsOpen(false)
    onChange(option)
  }

  return (
    <div id={id} className="dropdown" ref={dropdownRef}>
      <label htmlFor="dropdown-select" className="dropdown__label">{label}</label>
      <button
        type="button"
        disabled={disabled}
        id="dropdown-select"
        data-errored={isErrored}
        onClick={handleSelectedClick}
        className="dropdown__select"
      >
        {chosenPlaceholder}
        <ChevronDownIcon
          className={classNames(
            "dropdown__select-icon",
            { "dropdown__select-icon--open": isOpen }
          )}
        />
      </button>

      <div
        className={classNames(
          "dropdown__wrapper",
          { "dropdown__wrapper--open": isOpen }
        )}
      >
        {options.map(({ id, text }) => (
          <button
            key={id}
            type="button"
            className="button dropdown__option"
            onClick={handleSelectionClick({ id, text })}
          >{text}</button>
        ))}
      </div>
      <p
        aria-invalid={isErrored}
        className={classNames(
          "dropdown__helper",
          { "dropdown__helper--visible": helperText }
        )}
      >
        {helperText} &nbsp;
      </p>
    </div>
  )
}

export default Dropdown