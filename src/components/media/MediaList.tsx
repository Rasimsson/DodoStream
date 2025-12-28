import { memo } from 'react';
import { FlashList } from '@shopify/flash-list';
import theme from '@/theme/theme';
import { MediaCard } from './MediaCard';
import { MetaPreview } from '@/types/stremio';
import { HorizontalSpacer } from '@/components/basic/Spacer';

interface MediaListProps {
  data: MetaPreview[];
  onMediaPress: (media: MetaPreview) => void;
  /** Pass true to give the first item TV preferred focus */
  hasTVPreferredFocus?: boolean;
  /** Called whenever any card in this row receives focus (TV only at call site) */
  onItemFocused?: () => void;
}

export const MediaList = memo((props: MediaListProps) => {
  const { data, onMediaPress, hasTVPreferredFocus = false, onItemFocused } = props;
  return (
    <FlashList
      horizontal
      data={data}
      renderItem={({ item, index }) => (
        <MediaCard
          media={item}
          onPress={onMediaPress}
          hasTVPreferredFocus={hasTVPreferredFocus && index === 0}
          onFocused={onItemFocused}
        />
      )}
      keyExtractor={(item, index) => item.id + '_' + index}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HorizontalSpacer}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.m,
        paddingVertical: theme.spacing.s,
      }}
    />
  );
});

MediaList.displayName = 'MediaList';
