interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeading({ eyebrow, title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
