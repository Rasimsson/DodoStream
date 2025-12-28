import { Container } from '@/components/basic/Container';
import { Link, Stack } from 'expo-router';
import { Box, Text } from '@/theme/theme';

export default function NotFoundScreen() {
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text variant="subheader">This screen doesn&apos;t exist.</Text>
        <Link href="/">
          <Box marginTop="m" paddingTop="m">
            <Text variant="body" color="textLink">
              Go to home screen!
            </Text>
          </Box>
        </Link>
      </Container>
    </Box>
  );
}
