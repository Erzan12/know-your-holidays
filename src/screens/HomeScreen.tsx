import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useState } from "react";
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
// Using Lucide here, but easily swapped to IonIcons or FontAwesome from Expo
import { Calendar, ChevronDown, Search, Globe, X } from "lucide-react-native";
import { colors, fonts, spacing } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Sample structural dataset matching your flag layout request
const COUNTRIES = [
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

export function HomeScreen({ navigation }: Props) {
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default to PH
    const [year, setYear] = useState(String(new Date().getFullYear()));
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCountries = COUNTRIES.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectCountry = (countryObj: typeof COUNTRIES[0]) => {
        setSelectedCountry(countryObj);
        setModalVisible(false);
        setSearchQuery("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.paper} />
            
            {/* Header section styled around Fraunces Display text */}
            <View style={styles.headerContainer}>
                <Text style={styles.titleText}>Know Your Holiday</Text>
                <Text style={styles.subtitleText}>
                    Track regional public celebrations and plan your long weekends ahead.
                </Text>
            </View>

            {/* Dashboard Input Container */}
            <View style={styles.card}>
                
                {/* Custom Modal Trigger styled as a clean Dropdown Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Country</Text>
                    <TouchableOpacity 
                        style={styles.dropdownTrigger} 
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.dropdownValueLeft}>
                            <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                            <Text style={styles.countryText}>
                                {selectedCountry.name} <Text style={styles.codeDim}>({selectedCountry.code})</Text>
                            </Text>
                        </View>
                        <ChevronDown size={20} color={colors.mute} />
                    </TouchableOpacity>
                </View>

                {/* Styled Year Input with Inline Calendar Icon */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Year</Text>
                    <View style={styles.inputIconWrapper}>
                        <Calendar size={18} color={colors.mute} style={styles.inlineIcon} />
                        <TextInput
                            style={styles.input}
                            value={year}
                            onChangeText={setYear}
                            placeholder="Year"
                            keyboardType="number-pad"
                            placeholderTextColor={colors.mute}
                        />
                    </View>
                </View>

                {/* Primary Modern App CTA */}
                <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('HolidayList', { 
                        country: selectedCountry.code, 
                        year: Number(year) 
                    })}
                    activeOpacity={0.8}
                >
                    <Globe size={18} color={colors.white} style={{ marginRight: spacing.sm }} />
                    <Text style={styles.buttonText}>View Holidays</Text>
                </TouchableOpacity>
            </View>

            {/* Accessible Search Modal Backdrop Layout */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Country</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X size={24} color={colors.ink} />
                            </TouchableOpacity>
                        </View>

                        {/* Interactive Filtering Row */}
                        <View style={styles.searchBarWrapper}>
                            <Search size={18} color={colors.mute} style={styles.searchIcon} />
                            <TextInput 
                                style={styles.searchBar}
                                placeholder="Search country name or code..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholderTextColor={colors.mute}
                                autoCapitalize="none"
                            />
                        </View>

                        <FlatList
                            data={filteredCountries}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={styles.countryRow}
                                    onPress={() => handleSelectCountry(item)}
                                >
                                    <Text style={styles.rowFlag}>{item.flag}</Text>
                                    <Text style={styles.rowName}>{item.name}</Text>
                                    <Text style={styles.rowCode}>{item.code}</Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: colors.paper,
        paddingHorizontal: spacing.lg,
    },
    headerContainer: {
        marginTop: spacing.xl * 1.5,
        marginBottom: spacing.xl,
    },
    titleText: {
        fontFamily: fonts.display,
        fontSize: 32,
        color: colors.ink,
        marginBottom: spacing.xs,
    },
    subtitleText: {
        fontFamily: fonts.body,
        fontSize: 15,
        color: colors.mute,
        lineHeight: 22,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.paperDim,
    },
    inputGroup: {
        marginBottom: spacing.md,
    },
    label: {
        fontFamily: fonts.bodyBold,
        fontSize: 13,
        color: colors.ink,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    dropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.paper,
        borderRadius: 10,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.paperDim,
    },
    dropdownValueLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagText: {
        fontSize: 18,
        marginRight: spacing.sm,
    },
    countryText: {
        fontFamily: fonts.body,
        fontSize: 16,
        color: colors.ink,
    },
    codeDim: {
        fontFamily: fonts.mono,
        fontSize: 14,
        color: colors.mute,
    },
    inputIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.paper,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.paperDim,
    },
    inlineIcon: {
        marginLeft: spacing.md,
    },
    input: { 
        flex: 1,
        fontFamily: fonts.body,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        fontSize: 16,
        color: colors.ink,
    },
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: colors.forest,
        borderRadius: 10,
        paddingVertical: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.sm,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.bodyBold,
    },
    
    // Modal Overlay Styling
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(34, 37, 42, 0.4)', // tint using your theme's colors.ink
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '75%',
        paddingBottom: spacing.xl,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderColor: colors.paperDim,
    },
    modalTitle: {
        fontFamily: fonts.display,
        fontSize: 20,
        color: colors.ink,
    },
    searchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.paper,
        margin: spacing.lg,
        borderRadius: 10,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.paperDim,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchBar: {
        flex: 1,
        fontFamily: fonts.body,
        paddingVertical: spacing.sm * 1.5,
        fontSize: 15,
        color: colors.ink,
    },
    countryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    rowFlag: {
        fontSize: 20,
        marginRight: spacing.md,
    },
    rowName: {
        flex: 1,
        fontFamily: fonts.body,
        fontSize: 16,
        color: colors.ink,
    },
    rowCode: {
        fontFamily: fonts.mono,
        fontSize: 14,
        color: colors.mute,
    },
    separator: {
        height: 1,
        backgroundColor: colors.paperDim,
        marginLeft: spacing.lg + 32, // Line offsets cleanly past flags
    }
});