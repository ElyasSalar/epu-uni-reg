import Link from "next/link"

import type { FC } from "react"

interface InstructionsCardsProps {
  href: string
  title: string
  description: string
}

const InstructionsCards: FC<InstructionsCardsProps> = ({
  href,
  title,
  description,
}) => {
  return (
    <div className="instruction-card">
      <Link href={href} className="instruction-card__title">{title}</Link>
      <p className="instruction-card__description">{description}</p>
    </div>
  )
}

export default InstructionsCards