import { Container } from '@/components/basic/Container';
import { MediaList } from '@/components/media/MediaList';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SectionList } from 'react-native';
import { Box, Text } from '@/theme/theme';
import { useSearchCatalogs } from '@/api/stremio';
import { MetaPreview } from '@/types/stremio';
import { LoadingQuery } from '@/components/basic/LoadingQuery';
import { useMediaNavigation } from '@/hooks/useMediaNavigation';

export default function Search() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const { navigateToDetails } = useMediaNavigation();
  const searchQuery = q || '';

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchCatalogs(searchQuery, searchQuery.length > 0);

  // Transform searchResults into SectionList format
  const sections = searchResults.map((result) => ({
    title: result.catalogName,
    data: [result], // Wrap in array for SectionList
  }));

  const handleMediaPress = (media: MetaPreview) => {
    navigateToDetails(media.id, media.type);
  };

  return (
    <Container>
      <Stack.Screen
        options={{
          title: `Search: ${searchQuery}`,
        }}
      />
      <Box flex={1}>
        <LoadingQuery
          isLoading={isLoading}
          isError={isError}
          data={searchResults}
          loadingMessage="Searching..."
          errorMessage="Failed to load media details">
          {(searchResults) =>
            searchResults.length === 0 ? (
              <Box backgroundColor="cardBackground" padding="m" borderRadius="m">
                <Text variant="body" color="textSecondary">
                  No results found for &quot;{searchQuery}&quot;
                </Text>
              </Box>
            ) : (
              <SectionList
                sections={sections}
                keyExtractor={(item, index) => `${item.manifestUrl}-${item.catalogId}-${index}`}
                renderItem={({ item }) => (
                  <SearchCatalogResults metas={item.metas} onMediaPress={handleMediaPress} />
                )}
                renderSectionHeader={() => null}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
            )
          }
        </LoadingQuery>
      </Box>
    </Container>
  );
}

/**
 * Component to display search results from a single catalog
 */
interface SearchCatalogResultsProps {
  metas: MetaPreview[];
  onMediaPress: (media: MetaPreview) => void;
}

function SearchCatalogResults({ metas, onMediaPress }: SearchCatalogResultsProps) {
  if (!metas || metas.length === 0) {
    return null;
  }

  return <MediaList data={metas} onMediaPress={onMediaPress} />;
}
