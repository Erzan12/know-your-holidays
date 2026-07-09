import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../theme/theme';

const MONTHS_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export function HolidayCard({
  date, name, localName, type,
}: { date: string; name: string; localName?: string | null; type?: string | null }) {
  const d = new Date(date);
  const isSpecial = type?.toLowerCase().includes('optional') || type?.toLowerCase().includes('bank');
  const accent = isSpecial ? colors.ember : colors.forest;
  const accentSoft = isSpecial ? colors.emberSoft : colors.forestSoft;

  return (
    <View style={styles.row}>
      <View style={[styles.tab, { backgroundColor: accentSoft }]}>
        <Text style={[styles.day, { color: accent }]}>{d.getDate()}</Text>
        <Text style={[styles.month, { color: accent }]}>{MONTHS_SHORT[d.getMonth()]}</Text>
      </View>

      <View style={styles.perforation}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={styles.dash} />
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {!!localName && localName !== name && (
          <Text style={styles.local}>{localName}</Text>
        )}
        {!!type && <Text style={styles.type}>{type}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  tab: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  day: { fontFamily: fonts.display, fontSize: 26, lineHeight: 28 },
  month: { fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1, marginTop: 2 },
  perforation: {
    justifyContent: 'space-evenly',
    paddingVertical: spacing.md,
  },
  dash: { width: 1, height: 4, backgroundColor: colors.paperDim },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  name: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink },
  local: { fontFamily: fonts.body, fontSize: 12, color: colors.mute, marginTop: 2 },
  type: { fontFamily: fonts.mono, fontSize: 10, color: colors.mute, marginTop: 6, textTransform: 'uppercase' },
});