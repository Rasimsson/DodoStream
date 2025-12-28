import { Skeleton } from '@/components/basic/Skeleton';
import { HorizontalSpacer, VerticalSpacer } from '@/components/basic/Spacer';
import type { Theme } from '@/theme/theme';
import { Box } from '@/theme/theme';
import { useTheme } from '@shopify/restyle';
import { memo, useMemo } from 'react';
import { ScrollView } from 'react-native';

export interface CardListSkeletonProps {
  horizontal: boolean;
  count: number;
  cardWidth: number | `${number}%`;
  cardHeight: number;
  cardBorderRadius?: keyof Theme['borderRadii'];
  withLabel?: boolean;
  contentPaddingHorizontal?: keyof Theme['spacing'];
  contentPaddingVertical?: keyof Theme['spacing'];
}

export const CardListSkeleton = memo(
  ({
    horizontal,
    count,
    cardWidth,
    cardHeight,
    cardBorderRadius = 'l',
    withLabel = true,
    contentPaddingHorizontal = 'm',
    contentPaddingVertical = 's',
  }: CardListSkeletonProps) => {
    const theme = useTheme<Theme>();

    const data = useMemo(() => Array.from({ length: count }, (_, index) => index), [count]);

    const contentPaddingStyle = {
      paddingHorizontal: theme.spacing[contentPaddingHorizontal],
      paddingVertical: theme.spacing[contentPaddingVertical],
    };

    if (horizontal) {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={contentPaddingStyle}>
          <Box flexDirection="row">
            {data.map((item) => (
              <Box key={`card-skeleton-${item}`} width={cardWidth} gap="s">
                <Skeleton width={cardWidth} height={cardHeight} borderRadius={cardBorderRadius} />
                {withLabel ? (
                  <Skeleton width="75%" height={theme.spacing.m} borderRadius="s" />
                ) : null}
                {item === data.length - 1 ? null : <HorizontalSpacer />}
              </Box>
            ))}
          </Box>
        </ScrollView>
      );
    }

    return (
      <Box style={contentPaddingStyle}>
        {data.map((item) => (
          <Box key={`card-skeleton-${item}`} width="100%" gap="s">
            <Skeleton width="100%" height={cardHeight} borderRadius={cardBorderRadius} />
            {withLabel ? <Skeleton width="75%" height={theme.spacing.m} borderRadius="s" /> : null}
            {item === data.length - 1 ? null : <VerticalSpacer size="m" />}
          </Box>
        ))}
      </Box>
    );
  }
);

CardListSkeleton.displayName = 'CardListSkeleton';
