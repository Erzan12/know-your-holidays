import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useState, useMemo } from "react";
import { 
  StyleSheet, 
  TextInput, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Modal,
  FlatList
} from "react-native";
import { Calendar, ChevronDown, Search, Globe, X, Compass, PartyPopper } from "lucide-react-native";
import { useHolidays } from "../api/useHolidays";
import { colors, fonts, spacing } from "../theme/theme";
import { COUNTRIES, REGIONS } from "../constants/countries";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [selectedRegion, setSelectedRegion] = useState('All'); // New State
    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Hook up your real public holidays query directly to the dashboard framework
    const { data: holidays } = useHolidays(selectedCountry.code, Number(year));

    // Scan if TODAY is a holiday
    const todaysHoliday = useMemo(() => {
        if (!holidays) return null;
        return holidays.find((h: any) => h.isToday === true);
    }, [holidays]);

    // Otherwise calculate the next upcoming getaway countdown
    const nextHolidayInfo = useMemo(() => {
        if (!holidays || todaysHoliday) return null;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = holidays
            .map((h: any) => ({ ...h, dateObj: new Date(h.date) }))
            .filter((h: any) => h.dateObj >= today)
            .sort((a: any, b: any) => a.dateObj.getTime() - b.dateObj.getTime())[0];

        if (!upcoming) return null;

        const timeDiff = upcoming.dateObj.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return {
            name: upcoming.name,
            daysLeft: daysLeft,
            formattedDate: upcoming.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
    }, [holidays, todaysHoliday]);

    // Filter by BOTH active region and search term
    const filteredCountries = useMemo(() => {
        return COUNTRIES.filter(c => {
            const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  c.code.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesRegion && matchesSearch;
        });
    }, [selectedRegion, searchQuery]);

    const handleSelectCountry = (countryObj: typeof COUNTRIES[0]) => {
        setSelectedCountry(countryObj);
        setModalVisible(false);
        setSearchQuery("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.paper} />
            
            <View style={styles.headerContainer}>
                <Text style={styles.titleText}>Know Your Holiday</Text>
                <Text style={styles.subtitleText}>Track celebrations and perfect your next getaway.</Text>
            </View>

            {/* DYNAMIC HEADER ZONE */}
            {/* Condition A: It is a holiday today! Display Celebratory Greeting Card */}
            {todaysHoliday ? (
                <View style={styles.celebrationCard}>
                    <View style={styles.heroHeader}>
                        <PartyPopper size={18} color={colors.ember} />
                        <Text style={styles.celebrationTag}>HAPPENING TODAY</Text>
                    </View>
                    <Text style={styles.celebrationHolidayName}>Happy {todaysHoliday.name}! 🎉</Text>
                    <Text style={styles.celebrationSubtitle}>
                        Enjoy your hard-earned day off! Have a safe and relaxing trip to the province.
                    </Text>
                </View>
            ) : nextHolidayInfo ? (
                /* Condition B: Default State — Display Standard Getaway Countdown Hero Card */
                <View style={styles.heroCard}>
                    <View style={styles.heroHeader}>
                        <Compass size={16} color={colors.forest} />
                        <Text style={styles.heroTag}>NEXT GETAWAY OPPORTUNITY</Text>
                    </View>
                    <Text style={styles.heroHolidayName}>{nextHolidayInfo.name}</Text>
                    <Text style={styles.heroCountdownText}>
                        🏷️ Only <Text style={styles.heroDaysEmphasis}>{nextHolidayInfo.daysLeft}</Text> days to go! ({nextHolidayInfo.formattedDate})
                    </Text>
                </View>
            ) : null}

            {/* Main Selection Card UI */}
            <View style={styles.card}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Country</Text>
                    <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setModalVisible(true)}>
                        <View style={styles.dropdownValueLeft}>
                            <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                            <Text style={styles.countryText}>
                                {selectedCountry.name} <Text style={styles.codeDim}>({selectedCountry.code})</Text>
                            </Text>
                        </View>
                        <ChevronDown size={20} color={colors.mute} />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Year</Text>
                    <View style={styles.inputIconWrapper}>
                        <Calendar size={18} color={colors.mute} style={styles.inlineIcon} />
                        <TextInput
                            style={styles.input}
                            value={year}
                            onChangeText={setYear}
                            keyboardType="number-pad"
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('HolidayList', { country: selectedCountry.code, year: Number(year) })}
                >
                    <Globe size={18} color={colors.white} style={{ marginRight: spacing.sm }} />
                    <Text style={styles.buttonText}>View Holidays</Text>
                </TouchableOpacity>
            </View>

            {/* Country Picker Selection Modal Component */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Country</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X size={24} color={colors.ink} />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.searchBarWrapper}>
                            <Search size={18} color={colors.mute} style={styles.searchIcon} />
                            <TextInput style={styles.searchBar} placeholder="Search..." value={searchQuery} onChangeText={setSearchQuery} />
                        </View>

                        {/* NEW: Region selector pills inside modal */}
                        <View style={styles.regionTabs}>
                            {REGIONS.map((r) => (
                                <TouchableOpacity 
                                    key={r} 
                                    style={[styles.regionTab, selectedRegion === r && styles.activeRegionTab]} 
                                    onPress={() => setSelectedRegion(r)}
                                >
                                    <Text style={[styles.regionTabText, selectedRegion === r && styles.activeRegionTabText]}>
                                        {r}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <FlatList
                            data={filteredCountries}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.countryRow} onPress={() => handleSelectCountry(item)}>
                                    <Text style={styles.rowFlag}>{item.flag}</Text>
                                    <Text style={styles.rowName}>{item.name}</Text>
                                    <Text style={styles.rowCode}>{item.code}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: spacing.lg },
    headerContainer: { marginTop: spacing.xl, marginBottom: spacing.md },
    titleText: { fontFamily: fonts.display, fontSize: 32, color: colors.ink, marginBottom: spacing.xs },
    subtitleText: { fontFamily: fonts.body, fontSize: 15, color: colors.mute, lineHeight: 22 },
    
    // Condition A Style Matrix: Dynamic Vibrant Festive Greeting Banner
    celebrationCard: {
        backgroundColor: colors.emberSoft,
        borderRadius: 16,
        padding: spacing.md * 1.25,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: '#F5C6C1',
    },
    celebrationTag: {
        fontFamily: fonts.mono,
        fontSize: 11,
        color: colors.ember,
        letterSpacing: 1,
    },
    celebrationHolidayName: {
        fontFamily: fonts.display,
        fontSize: 22,
        color: colors.ink,
        marginBottom: spacing.xs,
    },
    celebrationSubtitle: {
        fontFamily: fonts.body,
        fontSize: 14,
        color: colors.ink,
        lineHeight: 20,
    },

    regionTabs: { 
        flexDirection: 'row', 
        paddingHorizontal: spacing.lg, 
        marginBottom: spacing.md, 
        gap: spacing.xs 
    },
    regionTab: { 
        paddingVertical: spacing.sm, 
        paddingHorizontal: spacing.md, 
        borderRadius: 20, 
        backgroundColor: colors.paper,
        borderWidth: 1,
        borderColor: colors.paperDim,
    },
    activeRegionTab: { 
        backgroundColor: colors.forest, 
        borderColor: colors.forest 
    },
    regionTabText: { 
        fontFamily: fonts.body, 
        fontSize: 13, 
        color: colors.mute 
    },
    activeRegionTabText: { 
        fontFamily: fonts.bodyBold, 
        color: colors.white 
    },

    // Condition B Style Matrix: Getaway Countdown Banner
    heroCard: {
        backgroundColor: colors.forestSoft,
        borderRadius: 16,
        padding: spacing.md * 1.25,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: '#D4E2D1',
    },
    heroHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xs },
    heroTag: { fontFamily: fonts.mono, fontSize: 11, color: colors.forest, letterSpacing: 1 },
    heroHolidayName: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginBottom: spacing.xs },
    heroCountdownText: { fontFamily: fonts.body, fontSize: 14, color: colors.ink },
    heroDaysEmphasis: { fontFamily: fonts.bodyBold, color: colors.forest },

    card: { backgroundColor: colors.white, borderRadius: 16, padding: spacing.lg, borderWidth: 1, borderColor: colors.paperDim },
    inputGroup: { marginBottom: spacing.md },
    label: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.ink, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
    dropdownTrigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.paper, borderRadius: 10, padding: spacing.md, borderWidth: 1, borderColor: colors.paperDim },
    dropdownValueLeft: { flexDirection: 'row', alignItems: 'center' },
    flagText: { fontSize: 18, marginRight: spacing.sm },
    countryText: { fontFamily: fonts.body, fontSize: 16, color: colors.ink },
    codeDim: { fontFamily: fonts.mono, fontSize: 14, color: colors.mute },
    inputIconWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.paper, borderRadius: 10, borderWidth: 1, borderColor: colors.paperDim },
    inlineIcon: { marginLeft: spacing.md },
    input: { flex: 1, fontFamily: fonts.body, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, fontSize: 16, color: colors.ink },
    primaryButton: { flexDirection: 'row', backgroundColor: colors.forest, borderRadius: 10, paddingVertical: spacing.md, alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm },
    buttonText: { color: colors.white, fontSize: 16, fontFamily: fonts.bodyBold },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(34, 37, 42, 0.4)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '75%', paddingBottom: spacing.xl },
    modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderBottomWidth: 1, borderColor: colors.paperDim },
    modalTitle: { fontFamily: fonts.display, fontSize: 20, color: colors.ink },
    searchBarWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.paper, margin: spacing.lg, borderRadius: 10, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.paperDim },
    searchIcon: { marginRight: spacing.sm },
    searchBar: { flex: 1, fontFamily: fonts.body, paddingVertical: spacing.sm * 1.5, fontSize: 15, color: colors.ink },
    countryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    rowFlag: { fontSize: 20, marginRight: spacing.md },
    rowName: { flex: 1, fontFamily: fonts.body, fontSize: 16, color: colors.ink },
    rowCode: { fontFamily: fonts.mono, fontSize: 14, color: colors.mute }
});