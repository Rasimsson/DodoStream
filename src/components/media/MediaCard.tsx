import { memo } from 'react';
import { Box, Text } from '@/theme/theme';
import { MetaPreview } from '@/types/stremio';
import { Image } from 'expo-image';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '@/theme/theme';

import { Badge } from '@/components/basic/Badge';
import { NO_POSTER_PORTRAIT } from '@/constants/images';
import { Focusable } from '@/components/basic/Focusable';
import { getImageSource } from '@/utils/image';

interface MediaCardProps {
  media: MetaPreview;
  onPress: (media: MetaPreview) => void;
  badgeLabel?: string;
  testID?: string;
  hasTVPreferredFocus?: boolean;
  onFocused?: () => void;
}

export const MediaCard = memo(
  ({
    media,
    onPress,
    badgeLabel,
    testID,
    hasTVPreferredFocus = false,
    onFocused,
  }: MediaCardProps) => {
    const theme = useTheme<Theme>();

    const posterSource = getImageSource(media.poster || media.background, NO_POSTER_PORTRAIT);
    return (
      <Focusable
        onPress={() => onPress(media)}
        withOutline
        testID={testID}
        hasTVPreferredFocus={hasTVPreferredFocus}
        recyclingKey={media.id}
        onFocusChange={(isFocused) => {
          if (isFocused) onFocused?.();
        }}>
        {({ focusStyle }) => (
          <Box width={theme.cardSizes.media.width} gap="s">
            <Box
              height={theme.cardSizes.media.height}
              width={theme.cardSizes.media.width}
              borderRadius="l"
              overflow="hidden"
              backgroundColor="cardBackground"
              position="relative"
              style={focusStyle}>
              <Image
                source={posterSource}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
                recyclingKey={media.id}
              />

              {badgeLabel ? (
                <Box position="absolute" top={theme.spacing.s} right={theme.spacing.s}>
                  <Badge label={badgeLabel} />
                </Box>
              ) : null}
            </Box>
            <Text variant="cardTitle" numberOfLines={1}>
              {media.name}
            </Text>
          </Box>
        )}
      </Focusable>
    );
  }
);

MediaCard.displayName = 'MediaCard';
