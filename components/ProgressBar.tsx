import type { FC } from "react"

type ProgressBarProps = {
  progress: number
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__progress" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar