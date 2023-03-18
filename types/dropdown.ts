export type DropdownOption = {
  id: string
  text: string
}

export type DropdownProps<T = DropdownOption> = {
  id: string
  label: string
  options: T[]
  disabled?: boolean
  helperText?: string | null
  placeholder: string
  isErrored?: boolean
  selected: T | undefined
  onChange: (value: T) => void
}