"use client";

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  headingLevel?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeader({
  title,
  description,
  badge,
  headingLevel = 'h2',
}: SectionHeaderProps) {
  const HeadingTag = headingLevel;
  const headingClasses = {
    h1: 'text-4xl',
    h2: 'text-2xl',
    h3: 'text-lg',
  }[headingLevel];

  return (
    <div>
      {badge && <p className="text-sm uppercase tracking-[0.3em] text-sky-600">{badge}</p>}
      <HeadingTag className={`${badge ? 'mt-2' : ''} ${headingClasses} font-semibold text-slate-900`}>
        {title}
      </HeadingTag>
      {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
    </div>
  );
}
