import { forwardRef } from "react"
import classNames from "classnames"

import type { InputHTMLAttributes, LegacyRef, DetailedHTMLProps } from "react"

type CustomInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size"> & {
  id?: string
  placeholder: string
  helperText: string
  label: string
  isErrored?: boolean
  size: "large" | "middle" | "small"
}

const CustomInput = forwardRef((props: CustomInputProps, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <div className="text-input">
      <label
        htmlFor={props.name}
        className="text-input__label"
      >{props.label}</label>
      <input
        ref={ref}
        id={props.id}
        name={props.name}
        type={props.type}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={props.onChange}
        disabled={props.disabled}
        aria-required={props.required}
        aria-invalid={props.isErrored}
        placeholder={props.placeholder}
        className={classNames(
          "text-input__handler",
          { "text-input__handler--large": props.size === "large" },
          { "text-input__handler--middle": props.size === "middle" },
          { "text-input__handler--small": props.size === "small" },
          { "text-input__handler--error": props.isErrored },
        )}
      />
      <p
        aria-invalid={props.isErrored}
        className={classNames(
          "text-input__helper",
          { "text-input__helper--visible": props.helperText }
        )}
      >
        {props.helperText} &nbsp;
      </p>
    </div>
  )
})

CustomInput.displayName = "CustomInput"

export default CustomInput