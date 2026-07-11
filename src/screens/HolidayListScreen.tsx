import { useState } from 'react';
import { SectionList, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useHolidays } from '../api/useHolidays';
 // Hypothetical or multi-type hook split
import { HolidayCard, WeekendStrategy } from '../components/HolidayCard';
import { colors, fonts, spacing } from '../theme/theme';
import { useSchoolHolidays } from '../api/useSchoolHolidays';

type Props = NativeStackScreenProps<RootStackParamList, 'HolidayList'>;

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getWeekendStrategy(dateString: string): WeekendStrategy | undefined {
  const day = new Date(dateString).getDay();
  if (day === 1 || day === 5) return { type: '3_DAY', text: '✨ 3-Day Weekend!' };
  if (day === 2) return { type: 'BRIDGE_DAY', text: '⏳ Take Mon off' };
  if (day === 4) return { type: 'BRIDGE_DAY', text: '⏳ Take Fri off' };
  return undefined;
}

export function HolidayListScreen({ route }: Props) {
  const { country, year } = route.params;
  
  // Tab State: 'public' or 'school'
  const [activeTab, setActiveTab] = useState<'public' | 'school'>('public');

  // Fetching methods (in production, your hook or OpenHolidays endpoint can filter by type)
  const publicHolidays = useHolidays(country, year);
  const schoolHolidays = useSchoolHolidays(country, year); 

  const currentQuery = activeTab === 'public' ? publicHolidays : schoolHolidays;

  if (currentQuery.isLoading) return <ActivityIndicator style={styles.center} />;
  if (currentQuery.isError) return <Text style={styles.center}>Something went wrong.</Text>;

  type PublicHoliday = NonNullable<typeof publicHolidays.data>[number];
  type SchoolHoliday = NonNullable<typeof schoolHolidays.data>[number];
  type Holiday = PublicHoliday | SchoolHoliday;
  type ProcessedHoliday = Holiday & { strategy?: WeekendStrategy };
  type HolidaySection = { title: string; data: ProcessedHoliday[] };

  // Group data by months dynamically based on the active tab array selection
  const currentData = (currentQuery.data ?? []) as Holiday[];
  const sections: HolidaySection[] = Object.values(
    currentData.reduce(
      (acc: Record<number, HolidaySection>, h: Holiday) => {
        const m = new Date(h.date).getMonth();
        const strategy = getWeekendStrategy(h.date);
        const processedItem: ProcessedHoliday = { ...h, strategy };

        acc[m] ??= { title: MONTH_NAMES[m], data: [] };
        acc[m].data.push(processedItem);
        return acc;
      },
      {} as Record<number, HolidaySection>
    )
  );

  return (
    <View style={styles.container}>
      {/* Editorial Custom Tab Selector Component Row */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'public' && styles.tabButtonActive]}
          onPress={() => setActiveTab('public')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'public' && styles.tabTextActive]}>
            Public Holidays
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'school' && styles.tabButtonActive]}
          onPress={() => setActiveTab('school')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'school' && styles.tabTextActive]}>
            School & Breaks
          </Text>
        </TouchableOpacity>
      </View>

      <SectionList
        style={styles.list}
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <HolidayCard
            date={item.date}
            name={item.name}
            localName={item.localName}
            type={item.type ?? ''}
            strategy={item.strategy}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
    paddingHorizontal: spacing.md,
  },
  list: { 
    flex: 1,
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: colors.paper 
  },
  sectionHeader: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.ink,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  // Tab Switcher Styling
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.paperDim,
    borderRadius: 10,
    padding: spacing.xs,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm * 1.25,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: colors.white,
    // Soft organic card edge depth
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.mute,
  },
  tabTextActive: {
    fontFamily: fonts.bodyBold,
    color: colors.forest,
  },
});