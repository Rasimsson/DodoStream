import { Ionicons } from '@expo/vector-icons';

export interface NavItem {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
    screenName: string; // For tab navigator
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 'home',
        label: 'Home',
        icon: 'home',
        route: '/',
        screenName: 'index',
    },
    {
        id: 'discover',
        label: 'Discover',
        icon: 'compass-outline',
        route: '/discover',
        screenName: 'discover',
    },
    {
        id: 'my-list',
        label: 'My List',
        icon: 'bookmark-outline',
        route: '/my-list',
        screenName: 'my-list',
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: 'settings-outline',
        route: '/settings',
        screenName: 'settings',
    },
];
