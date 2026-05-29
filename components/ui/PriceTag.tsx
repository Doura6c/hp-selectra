type Props = {
  note: string
  isExample: boolean
}

export default function PriceTag({ note, isExample }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
        {note}
      </span>
      {isExample && (
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded w-fit"
          style={{
            backgroundColor: "var(--color-warning)",
            color: "#fff",
          }}
        >
          ⚠ Tarif à vérifier
        </span>
      )}
    </div>
  )
}
