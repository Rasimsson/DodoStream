import { FC } from 'react';
import { Box , Theme } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';


interface ProfileAvatarProps {
  icon: string;
  color: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 40,
  medium: 80,
  large: 120,
};

const iconSizeMap = {
  small: 24,
  medium: 48,
  large: 72,
};

export const ProfileAvatar: FC<ProfileAvatarProps> = ({ icon, color, size = 'medium' }) => {
  const theme = useTheme<Theme>();
  const containerSize = sizeMap[size];
  const iconSize = iconSizeMap[size];

  return (
    <Box
      width={containerSize}
      height={containerSize}
      borderRadius="full"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: color }}>
      <Ionicons name={icon as any} size={iconSize} color={theme.colors.mainForeground} />
    </Box>
  );
};
