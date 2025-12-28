/* eslint-env jest */
/* global jest */

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Avoid native module errors in component tests
jest.mock('expo-image', () => ({
    Image: 'ExpoImage',
}));

jest.mock('@expo/vector-icons', () => {
    const React = require('react');
    const { Text } = require('react-native');

    const createIcon = (name) => (props) => React.createElement(Text, props, name);

    return {
        Ionicons: createIcon('Ionicons'),
        MaterialCommunityIcons: createIcon('MaterialCommunityIcons'),
    };
});

// React Query schedules updates via notifyManager; wrap them in act() to avoid warnings.
try {
    const { act } = require('@testing-library/react-native');
    const { notifyManager } = require('@tanstack/query-core');
    notifyManager.setNotifyFunction((fn) => {
        act(() => {
            fn();
        });
    });
    notifyManager.setBatchNotifyFunction((callback) => {
        act(() => {
            callback();
        });
    });
} catch {
    // Optional in environments that don't include react-query.
}
