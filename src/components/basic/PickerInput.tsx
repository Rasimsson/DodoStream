import { useTheme } from '@shopify/restyle';
import { Theme, Box, Text } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Focusable } from '@/components/basic/Focusable';
import { useCallback, useState } from 'react';
import { PickerItem, PickerModal, PickerModalProps } from '@/components/basic/PickerModal';

interface PickerInputProps<T extends string | number = string | number> extends Omit<
  PickerModalProps<T>,
  'visible' | 'onClose'
> {
  selectedLabel: string;
}

// TODO use everywhere
export function PickerInput<T extends string | number = string | number>({
  selectedLabel,
  ...modalProps
}: PickerInputProps<T>) {
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme<Theme>();

  return (
    <>
      <Focusable
        onPress={() => setShowModal(true)}
        focusStyle={{
          outlineWidth: theme.focus.borderWidthSmall,
          outlineColor: theme.colors.primaryBackground,
          borderRadius: theme.borderRadii.m,
        }}>
        <Box
          backgroundColor="cardBackground"
          borderRadius="m"
          paddingHorizontal="m"
          paddingVertical="s"
          flexDirection="row"
          alignItems="center"
          gap="s">
          <Text variant="body">{selectedLabel}</Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.mainForeground} />
        </Box>
      </Focusable>
      <PickerModal visible={showModal} onClose={() => setShowModal(false)} {...modalProps} />
    </>
  );
}
