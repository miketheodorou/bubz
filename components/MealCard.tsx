import { useThemeColor } from '@/hooks/useThemeColor';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export interface MealData {
  id: number;
  meal_type: string;
  meal_timestamp: string;
  is_eaten: boolean;
}

interface MealCardProps {
  meal: MealData;
  onPress?: (meal: MealData) => void;
}

export function MealCard({ meal, onPress }: MealCardProps) {
  // Call hooks at the top level
  const eatenBackgroundColor = useThemeColor(
    { light: '#e8f5e8', dark: '#1a3d1a' },
    'background'
  );
  const eatenBorderColor = useThemeColor(
    { light: '#4caf50', dark: '#66bb6a' },
    'tint'
  );
  const eatenStatusColor = useThemeColor(
    { light: '#4caf50', dark: '#66bb6a' },
    'tint'
  );
  const pendingBackgroundColor = useThemeColor(
    { light: '#fff3e0', dark: '#3d2914' },
    'background'
  );
  const pendingBorderColor = useThemeColor(
    { light: '#ff9800', dark: '#ffb74d' },
    'tint'
  );
  const pendingStatusColor = useThemeColor(
    { light: '#ff9800', dark: '#ffb74d' },
    'tint'
  );

  // Format the timestamp to show time
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return 'Time not available';
    }
  };

  // Get meal type icon
  const getMealIcon = (mealType: string) => {
    const type = mealType.toLowerCase();
    if (type.includes('breakfast')) return 'coffee';
    if (type.includes('lunch')) return 'food-apple';
    if (type.includes('dinner')) return 'silverware-fork-knife';
    if (type.includes('snack')) return 'cookie';
    return 'bowl';
  };

  // Determine status colors based on meal.is_eaten
  const statusColors = meal.is_eaten
    ? {
        backgroundColor: eatenBackgroundColor,
        borderColor: eatenBorderColor,
        statusColor: eatenStatusColor
      }
    : {
        backgroundColor: pendingBackgroundColor,
        borderColor: pendingBorderColor,
        statusColor: pendingStatusColor
      };

  return (
    <TouchableOpacity onPress={() => onPress?.(meal)} activeOpacity={0.7}>
      <ThemedView
        style={[
          styles.card,
          {
            backgroundColor: statusColors.backgroundColor,
            borderColor: statusColors.borderColor
          }
        ]}
      >
        <View style={styles.cardContent}>
          {/* Left side - Icon and meal info */}
          <View style={styles.leftContent}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={getMealIcon(meal.meal_type)}
                size={24}
                color={statusColors.statusColor}
              />
            </View>
            <View style={styles.mealInfo}>
              <ThemedText type='defaultSemiBold' style={styles.mealType}>
                {meal.meal_type}
              </ThemedText>
              <ThemedText style={styles.timeText}>
                {formatTime(meal.meal_timestamp)}
              </ThemedText>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <MaterialCommunityIcons
              name={meal.is_eaten ? 'check-circle' : 'clock-outline'}
              size={28}
              color={statusColors.statusColor}
            />
            <ThemedText
              style={[styles.statusText, { color: statusColors.statusColor }]}
            >
              {meal.is_eaten ? 'Eaten' : 'Pending'}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 2,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconContainer: {
    marginRight: 12
  },
  mealInfo: {
    flex: 1
  },
  mealType: {
    fontSize: 18,
    marginBottom: 4,
    textTransform: 'capitalize'
  },
  timeText: {
    fontSize: 14,
    opacity: 0.7
  },
  statusContainer: {
    alignItems: 'center',
    minWidth: 70
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center'
  }
});
