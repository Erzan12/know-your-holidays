import { SectionList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useHolidays } from '../api/useHolidays';
import { HolidayCard } from '../components/HolidayCard';
import { colors, fonts, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'HolidayList'>;

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function HolidayListScreen({ route }: Props) {
  const { country, year } = route.params;
  const { data, isLoading, isError } = useHolidays(country, year);

  if (isLoading) return <ActivityIndicator style={styles.center} />;
  if (isError) return <Text style={styles.center}>Something went wrong.</Text>;

  type Holiday = NonNullable<typeof data>[number];

  const sections = Object.values(
    (data ?? []).reduce(
      (acc: Record<number, { title: string; data: Holiday[] }>, h: Holiday) => {
        const m = new Date(h.date).getMonth();
        acc[m] ??= { title: MONTH_NAMES[m], data: [] };
        acc[m].data.push(h);
        return acc;
      },
      {} as Record<number, { title: string; data: Holiday[] }>
    )
  );

  return (
    <SectionList
      style={styles.list}
      sections={sections}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: spacing.md }}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <HolidayCard
          date={item.date}
          name={item.name}
          localName={item.localName}
          type={item.type}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.paper },
  center: { flex: 1, textAlign: 'center', marginTop: 40 },
  sectionHeader: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.ink,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});