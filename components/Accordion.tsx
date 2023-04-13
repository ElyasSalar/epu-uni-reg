import classNames from "classnames"
import { useState } from "react"

import ChevronRightIcon from "../assets/icons/chevron-right.svg"

import type { FC } from "react"

interface AccordionProps {
  accordion: {
    title: string
    description: string
  }[]
}

const Accordion: FC<AccordionProps> = ({
  accordion
}) => {
  const [selectedAccordionIndex, setSelectedAccordionIndex] = useState<number | null>(null)

  const handleAccordionClick = (index: number) => () => {
    if (selectedAccordionIndex === index) {
      setSelectedAccordionIndex(null)
    } else {
      setSelectedAccordionIndex(index)
    }
  }

  return (
    <div className="accordion">
      {accordion.map(({ title, description }, index) => (
        <div key={title} className="accordion__item">
          <div className="accordion__item-header" onClick={handleAccordionClick(index)}>
            <h3 className="accordion__item-title">{title}</h3>
            <button
              type="button"
              className={classNames(
                "button",
                "accordion__item-button",
                { "accordion__item-button--up": selectedAccordionIndex === index}
              )}
            ><ChevronRightIcon width={10} /></button>
          </div>
          <div
            className={classNames(
              "accordion__item-description",
              { "accordion__item-description--shown": selectedAccordionIndex === index}
            )}
          >
            {description}
          </div>
        </div>
      ))}
    </div>
  )
}


export default Accordion