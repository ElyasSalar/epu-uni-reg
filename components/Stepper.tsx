import classNames from "classnames"
import { useRouter } from "next/router"
import { FC } from "react"
import { translateNumber } from "../lib/locale"

interface StepperProps {
  labels: string[]
  currentStepIndex: number,
}

const Stepper: FC<StepperProps> = ({ labels, currentStepIndex }) => {
  const { locale } = useRouter()

  return (
    <div className="stepper">
      {labels.map((label, i) => (
        <div key={label} className="stepper__element">
          <label
            className={classNames(
              "stepper__element-label",
              {"stepper__element-label--active": i <= currentStepIndex},
            )}
          >
            {translateNumber(i + 1, locale)}. {label}
          </label>
          <div
            className={classNames(
              "stepper__element-filler",
              {"stepper__element-filler--active": i <= currentStepIndex},
            )}
          />
        </div>
      ))}
    </div>
  )
}

export default Stepper