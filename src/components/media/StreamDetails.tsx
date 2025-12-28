import { memo } from 'react';
import { Image } from 'expo-image';
import { Box, Text } from '@/theme/theme';
import { NO_POSTER_PORTRAIT } from '@/constants/images';
import { MediaInfo } from '@/components/media/MediaInfo';
import type { MetaDetail, MetaVideo } from '@/types/stremio';
import { getImageSource } from '@/utils/image';

interface StreamDetailsProps {
  title: string;
  imageUrl?: string;
  /** Optional: pass meta & video to render full MediaInfo */
  meta?: MetaDetail;
  video?: MetaVideo;
}

export const StreamDetails = memo(({ title, imageUrl, meta, video }: StreamDetailsProps) => {
  const imageSource = getImageSource(imageUrl, NO_POSTER_PORTRAIT);

  return (
    <Box gap="m" padding="m">
      <Box flexDirection="row" gap="m">
        <Box
          width={110}
          height={160}
          borderRadius="m"
          overflow="hidden"
          backgroundColor="cardBackground">
          <Image
            source={imageSource}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
        </Box>

        <Box flex={1} gap="xs" justifyContent="center">
          <Text variant="subheader" numberOfLines={3}>
            {title}
          </Text>
        </Box>
      </Box>

      {meta ? <MediaInfo media={meta} video={video} variant="full" /> : null}
    </Box>
  );
});
