import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../theme/theme';

export type WeekendStrategy = {
  type: '3_DAY' | 'BRIDGE_DAY';
  text: string;
};

interface HolidayCardProps {
  date: string;
  name: string;
  localName: string;
  type: string;
  strategy?: WeekendStrategy;
}

export function HolidayCard({ date, name, localName,type, strategy }: HolidayCardProps) {
  // Format standard human readable date string (e.g., "Mon, Aug 24")
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.nameText}>{name}</Text>
        {localName !== name && <Text style={styles.localNameText}>{localName}</Text>}
      </View>

      {/* Dynamic Visualizer Badge Placement */}
      {strategy && (
        <View style={[
          styles.badge, 
          strategy.type === '3_DAY' ? styles.badgeForest : styles.badgeEmber
        ]}>
          <Text style={[
            styles.badgeText, 
            strategy.type === '3_DAY' ? styles.textForest : styles.textEmber
          ]}>
            {strategy.text}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.paperDim,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  dateText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.mute,
    marginBottom: 2,
  },
  nameText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
  },
  localNameText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.mute,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: spacing.sm * 1.5,
    paddingVertical: spacing.xs * 1.5,
    borderRadius: 8,
    maxWidth: '40%',
  },
  badgeForest: {
    backgroundColor: colors.forestSoft,
  },
  badgeEmber: {
    backgroundColor: colors.emberSoft,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    textAlign: 'center',
  },
  textForest: {
    color: colors.forest,
  },
  textEmber: {
    color: colors.ember,
  },
});