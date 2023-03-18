import classNames from "classnames"
import {
  useTranslation,
} from "next-i18next"

import type { FC } from "react"

type RadioGroupProps = {
  label?: string
  options: string[]
  selectedOption: string
  onChange: (newOption: string) => void
}

const RadioGroup: FC<RadioGroupProps> = ({ label, options, selectedOption, onChange }) => {
  const { t } = useTranslation("registration")
  
  return (
    <div className="radio-group">
      <label className="radio-group__label">{t(label || "")}</label>
      <div className="radio-group__options">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={classNames(
              "button",
              "radio-group__option",
              { "radio-group__option--selected": selectedOption === option }
            )}
          >{t(option)}</button>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup