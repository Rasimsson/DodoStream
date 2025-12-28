import { FC, ReactNode, memo } from 'react';
import { Box } from '@/theme/theme';
import { useResponsiveLayout } from '@/hooks/useBreakpoint';
import { SettingsMenu, SettingsMenuItem } from './SettingsMenu';
import { TVFocusGuideView } from 'react-native';

interface SettingsShellProps {
  /** Menu items for the left panel */
  menuItems: SettingsMenuItem[];
  /** Currently selected menu item ID */
  selectedId: string;
  /** Callback when a menu item is selected */
  onSelectItem: (id: string) => void;
  /** Content to render in the right panel (or full screen on mobile) */
  children: ReactNode;
  /** Title shown on mobile when viewing content */
  title?: string;
}

/**
 * Responsive settings container that provides split layout on wide screens
 *
 * On mobile: Renders only children (navigation handles menu)
 * On tablet/TV: Renders left menu + right content panel
 *
 * @example
 * <SettingsShell
 *   menuItems={SETTINGS_MENU_ITEMS}
 *   selectedId={selectedPage}
 *   onSelectItem={setSelectedPage}
 * >
 *   {selectedPage === 'playback' && <PlaybackSettingsContent />}
 *   {selectedPage === 'profiles' && <ProfilesSettingsContent />}
 * </SettingsShell>
 */
export const SettingsShell: FC<SettingsShellProps> = memo(
  ({ menuItems, selectedId, onSelectItem, children }) => {
    const { splitLayout } = useResponsiveLayout();

    // Mobile: just render children, navigation is handled by Stack
    if (!splitLayout.enabled) {
      return <>{children}</>;
    }

    // Wide layout: split view with menu on left, content on right
    return (
      <Box flex={1} flexDirection="row">
        {/* Left panel - Menu */}
        <Box
          width={splitLayout.menuWidth}
          backgroundColor="cardBackground"
          borderRightWidth={1}
          borderRightColor="cardBorder"
          padding="s">
          <SettingsMenu items={menuItems} selectedId={selectedId} onSelect={onSelectItem} />
        </Box>

        {/* Right panel - Content */}
        <TVFocusGuideView style={{ flex: splitLayout.contentFlex }}>
          <Box flex={1} backgroundColor="mainBackground">
            {children}
          </Box>
        </TVFocusGuideView>
      </Box>
    );
  }
);
