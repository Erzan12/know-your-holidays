import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
    const [country, setCountry] = useState('PH');
    const [year, setYear] = useState(String(new Date().getFullYear()));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Welcoming Header Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.titleText}>Know Your Holidays</Text>
                <Text style={styles.subtitleText}>Discover public holidays and plan your long weekends ahead.</Text>
            </View>

            {/* Form Dashboard Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Search Holidays</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Country Code</Text>
                    <TextInput
                        style={styles.input}
                        value={country}
                        onChangeText={setCountry}
                        placeholder="e.g. PH"
                        autoCapitalize="characters"
                        maxLength={2}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Year</Text>
                    <TextInput
                        style={styles.input}
                        value={year}
                        onChangeText={setYear}
                        placeholder="Year"
                        keyboardType="number-pad"
                    />
                </View>

                {/* Styled Custom Button Container */}
                <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('HolidayList', { country: country.toUpperCase(), year: Number(year) })}
                >
                    <Text style={styles.buttonText}>View Holidays</Text>
                </TouchableOpacity>
            </View>
            
            {/* Spacer or section for future content (e.g., Quick Favorites) */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Tip: Try "US", "JP", or "SG" to see global variations!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F7F9FC', // Soft off-white canvas
        paddingHorizontal: 24,
    },
    headerContainer: {
        marginTop: 40,
        marginBottom: 32,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1C1E',
        marginBottom: 8,
    },
    subtitleText: {
        fontSize: 15,
        color: '#6C757D',
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3, // Android shadow
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1C1E',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#495057',
        marginBottom: 6,
    },
    input: { 
        backgroundColor: '#F1F3F5',
        borderWidth: 0, // Removed stark border
        borderRadius: 10, 
        padding: 14, 
        fontSize: 16,
        color: '#1A1C1E',
    },
    primaryButton: {
        backgroundColor: '#3B82F6', // Strong, energetic accent color
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 24,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#ADB5BD',
        textAlign: 'center',
    }
});