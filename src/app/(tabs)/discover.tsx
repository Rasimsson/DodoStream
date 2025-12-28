import { Container } from '@/components/basic/Container';
import { PageHeader } from '@/components/basic/PageHeader';
import { Box, Text } from '@/theme/theme';
import { ScrollView } from 'react-native';

export default function Discover() {
  return (
    <Container>
      <Box>
        <PageHeader title="Discover" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Box gap="l" paddingBottom="xl">
            <Text variant="body" color="textSecondary">
              Coming soon...
            </Text>
          </Box>
        </ScrollView>
      </Box>
    </Container>
  );
}
