import { Box, Text } from '@/theme/theme';
import { ReactNode } from 'react';

interface SettingsCardProps {
  title?: string;
  children: ReactNode;
}

export function SettingsCard({ title, children }: SettingsCardProps) {
  return (
    <Box backgroundColor="cardBackground" borderRadius="m" padding="m" gap="m">
      {title && <Text variant="subheader">{title}</Text>}
      {children}
    </Box>
  );
}
