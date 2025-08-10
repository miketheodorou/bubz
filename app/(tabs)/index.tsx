import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

export default function FoodView() {
  const [mealType, setMealType] = useState<'Breakfast' | 'Dinner'>('Breakfast');
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Function to determine if it's breakfast or dinner time
    const determineMealTime = () => {
      const now = new Date();
      const hour = now.getHours();

      // If time is between 12AM and 3PM (15:00), it's breakfast time
      // Otherwise, it's dinner time
      if (hour >= 0 && hour < 15) {
        setMealType('Breakfast');
      } else {
        setMealType('Dinner');
      }
    };

    determineMealTime();

    // Update meal type every minute
    const interval = setInterval(determineMealTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemedView style={{ flex: 1, paddingHorizontal: 16 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingTop: 32 }}>
          <ThemedText
            style={{ fontSize: 48, fontWeight: '900', lineHeight: 56 }}
          >
            {mealType} Time
          </ThemedText>
          <ThemedText style={{ fontWeight: '500' }}>
            Has Lily eaten {mealType.toLocaleLowerCase()} yet?
          </ThemedText>
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Link href='/(modals)/meal-confirmation' asChild>
            <TouchableOpacity
              style={{
                padding: 48,
                backgroundColor: '#a855f7',
                borderRadius: '100%',
                aspectRatio: 1 / 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FontAwesome6
                name='bowl-rice'
                size={56}
                color={Colors[colorScheme ?? 'light']?.text}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
