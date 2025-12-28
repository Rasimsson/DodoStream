import { memo, useState } from 'react';
import { MotiView } from 'moti';
import { Image } from 'expo-image';
import type { ImageProps } from 'expo-image';
import { StyleSheet } from 'react-native';
import { ANIMATION_FADE_IN_MS } from '@/constants/ui';

export interface AnimatedImageProps extends ImageProps {
  durationMs?: number;
}

export const AnimatedImage = memo(
  ({ durationMs = ANIMATION_FADE_IN_MS, onLoadEnd, style, ...props }: AnimatedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ type: 'timing', duration: durationMs }}
        style={style ?? styles.fill}>
        <Image
          {...props}
          style={StyleSheet.compose(styles.fill, style)}
          onLoadEnd={() => {
            setIsLoaded(true);
            onLoadEnd?.();
          }}
        />
      </MotiView>
    );
  }
);

const styles = StyleSheet.create({
  fill: {
    width: '100%',
    height: '100%',
  },
});

AnimatedImage.displayName = 'AnimatedImage';
