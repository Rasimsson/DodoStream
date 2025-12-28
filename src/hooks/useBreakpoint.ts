import { useCallback, useMemo } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import theme from '@/theme/theme';

export type Breakpoint = 'mobile' | 'tablet' | 'tv';

/**
 * Hook to detect current breakpoint based on window width
 * @returns Current breakpoint: 'mobile' | 'tablet' | 'tv'
 */
export function useBreakpoint(): Breakpoint {
    const { width } = useWindowDimensions();

    if (width >= theme.breakpoints.tv) {
        return 'tv';
    }
    if (width >= theme.breakpoints.tablet) {
        return 'tablet';
    }
    return 'mobile';
}

/**
 * Hook to check if current breakpoint is at least the specified size
 */
export function useBreakpointValue<T>(values: { mobile: T; tablet?: T; tv?: T }): T {
    const breakpoint = useBreakpoint();

    if (breakpoint === 'tv' && values.tv !== undefined) {
        return values.tv;
    }
    if (breakpoint === 'tablet' && values.tablet !== undefined) {
        return values.tablet;
    }
    return values.mobile;
}

/** Split layout configuration for settings-style pages */
export interface SplitLayoutConfig {
    /** Whether split layout is enabled (true on tablet/TV) */
    enabled: boolean;
    /** Width of the left menu panel */
    menuWidth: number;
    /** Flex value for content area */
    contentFlex: number;
}

/** Responsive layout return type */
export interface ResponsiveLayoutResult {
    /** Current breakpoint */
    breakpoint: Breakpoint;

    /** Boolean checks for current breakpoint */
    isMobile: boolean;
    isTablet: boolean;
    isTV: boolean;

    /** True for tablet or TV (wide layouts that can show split views) */
    isWide: boolean;

    /** Current window dimensions */
    width: number;
    height: number;

    /** Number of grid columns appropriate for current breakpoint */
    columns: number;

    /** Maximum content width for current breakpoint */
    containerMaxWidth: number | undefined;

    /** Horizontal content padding for current breakpoint */
    contentPadding: number;

    /** Whether device is a TV platform */
    isPlatformTV: boolean;

    /** Split layout configuration for settings-style pages */
    splitLayout: SplitLayoutConfig;

    /**
     * Select a value based on current breakpoint
     * Falls back to smaller breakpoint values if not specified
     */
    select: <T>(values: { mobile: T; tablet?: T; tv?: T }) => T;
}

/**
 * Comprehensive responsive layout hook
 *
 * Provides breakpoint detection, dimension info, and helper methods
 * for building responsive UIs across mobile, tablet, and TV.
 *
 * @example
 * const { isWide, splitLayout, select } = useResponsiveLayout();
 *
 * // Responsive value selection
 * const fontSize = select({ mobile: 14, tablet: 16, tv: 18 });
 *
 * // Split layout for settings
 * if (splitLayout.enabled) {
 *   return (
 *     <Box flexDirection="row">
 *       <Box width={splitLayout.menuWidth}><Menu /></Box>
 *       <Box flex={splitLayout.contentFlex}><Content /></Box>
 *     </Box>
 *   );
 * }
 */
export function useResponsiveLayout(): ResponsiveLayoutResult {
    const { width, height } = useWindowDimensions();
    const breakpoint = useBreakpoint();

    const isMobile = breakpoint === 'mobile';
    const isTablet = breakpoint === 'tablet';
    const isTV = breakpoint === 'tv';
    const isWide = isTablet || isTV;
    const isPlatformTV = Platform.isTV;

    // Grid columns based on breakpoint
    const columns = useMemo(() => {
        if (isTV) return 4;
        if (isTablet) return 3;
        return 2;
    }, [isTV, isTablet]);

    // Max content width
    const containerMaxWidth = useMemo(() => {
        if (isTV) return Math.min(width * 0.7, 1200);
        if (isTablet) return Math.min(width * 0.85, 900);
        return undefined; // Full width on mobile
    }, [isTV, isTablet, width]);

    // Content padding
    const contentPadding = useMemo(() => {
        if (isTV) return theme.spacing.xl;
        if (isTablet) return theme.spacing.l;
        return theme.spacing.m;
    }, [isTV, isTablet]);

    // Split layout config
    const splitLayout = useMemo<SplitLayoutConfig>(
        () => ({
            enabled: isWide,
            menuWidth: isTV ? 320 : 280,
            contentFlex: 1,
        }),
        [isWide, isTV]
    );

    // Responsive value selector
    const select = useCallback(
        <T,>(values: { mobile: T; tablet?: T; tv?: T }): T => {
            if (isTV && values.tv !== undefined) {
                return values.tv;
            }
            if (isTablet && values.tablet !== undefined) {
                return values.tablet;
            }
            return values.mobile;
        },
        [isTV, isTablet]
    );

    return {
        breakpoint,
        isMobile,
        isTablet,
        isTV,
        isWide,
        width,
        height,
        columns,
        containerMaxWidth,
        contentPadding,
        isPlatformTV,
        splitLayout,
        select,
    };
}
