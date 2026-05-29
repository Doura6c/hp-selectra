import { hpScoreColor, hpScoreLabel } from "@/lib/utils"

type Props = {
  score: string
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

const SIZE = {
  sm: "w-7 h-7 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-xl",
}

export default function HPScoreBadge({ score, showLabel = false, size = "md" }: Props) {
  const color = hpScoreColor(score)
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${SIZE[size]} rounded-full flex items-center justify-center font-bold text-white shadow-sm`}
        style={{ backgroundColor: color }}
        title={`HP Score ${score} — ${hpScoreLabel(score)}`}
      >
        {score}
      </div>
      {showLabel && (
        <span className="text-xs font-medium" style={{ color }}>
          {hpScoreLabel(score)}
        </span>
      )}
    </div>
  )
}
