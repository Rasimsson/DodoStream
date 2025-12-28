import { useState, useCallback } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme, Box } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput = ({ placeholder = 'Search...' }: SearchInputProps) => {
  const theme = useTheme<Theme>();
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearch = useCallback(() => {
    const query = value.trim();
    if (query.length > 0) {
      router.push({
        pathname: '/search' as any,
        params: { q: query },
      });
    }
  }, [value, router]);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      backgroundColor="inputBackground"
      borderRadius="m"
      paddingHorizontal="m"
      height={56}>
      <Box marginRight="s">
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
      </Box>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={{
          flex: 1,
          color: theme.colors.textPrimary,
          fontSize: 16,
          fontFamily: undefined,
        }}
        placeholderTextColor={theme.colors.textPlaceholder}
        placeholder={placeholder}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      {value.length > 0 && (
        <>
          <TouchableOpacity onPress={handleClear}>
            <Box marginLeft="s">
              <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch}>
            <Box marginLeft="s">
              <Ionicons
                name="arrow-forward-circle"
                size={24}
                color={theme.colors.primaryBackground}
              />
            </Box>
          </TouchableOpacity>
        </>
      )}
    </Box>
  );
};
