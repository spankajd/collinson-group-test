"use client";

import Card from '@/components/shared/Card';
import SectionHeader from '@/components/shared/SectionHeader';

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="text-center">
      <SectionHeader
        badge="Ready to explore"
        title={title}
        description={description}
        headingLevel="h2"
      />
    </Card>
  );
}
