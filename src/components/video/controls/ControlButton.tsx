import React, { memo, useCallback, useState } from 'react';
import { Box, Text } from '@/theme/theme';
import { Button, ButtonProps, IconComponentType } from '@/components/basic/Button';

export interface ControlButtonProps extends Pick<
  ButtonProps<IconComponentType>,
  'icon' | 'iconComponent' | 'variant'
> {
  onPress: () => void;
  label?: string;
  hasTVPreferredFocus?: boolean;
  disabled?: boolean;
  onFocusChange?: (focused: boolean) => void;
}

export const ControlButton = memo(
  ({
    onPress,
    label,
    hasTVPreferredFocus = false,
    disabled = false,
    onFocusChange,
    variant = 'secondary',
    ...buttonProps
  }: ControlButtonProps) => {
    const [focused, setFocused] = useState(false);

    const handleFocused = useCallback(() => {
      setFocused(true);
      onFocusChange?.(true);
    }, [onFocusChange]);

    const handleBlurred = useCallback(() => {
      setFocused(false);
      onFocusChange?.(false);
    }, [onFocusChange]);

    return (
      <Box alignItems="center" justifyContent="center" position="relative">
        {!disabled && label && focused && (
          <Text variant="caption" color="mainForeground" position="absolute" top={-22}>
            {label}
          </Text>
        )}
        <Button
          {...buttonProps}
          onPress={onPress}
          hasTVPreferredFocus={hasTVPreferredFocus}
          disabled={disabled}
          onFocus={handleFocused}
          onBlur={handleBlurred}
          variant={variant}
        />
      </Box>
    );
  }
);
