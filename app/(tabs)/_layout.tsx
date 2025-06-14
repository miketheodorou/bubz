import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          marginTop: 4
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute'
          },
          default: {}
        })
      }}
    >
      <Tabs.Screen
        name='food-history'
        options={{
          title: 'Food Log',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='calendar-month'
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Feed Lily',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={24} name='dog' color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='walks'
        options={{
          title: 'Walks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={24}
              name='dog-service'
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
