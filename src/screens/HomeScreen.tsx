import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
    const [country, setCountry] = useState('PH');
    const [year, setYear] = useState(String(new Date().getFullYear()));

    return (
        <View>
            <TextInput
                style={styles.input}
                value={country}
                onChangeText={setCountry}
                placeholder="Country code (e.g. PH)"
                autoCapitalize="characters"
                maxLength={2}
            />
            <TextInput
                style={styles.input}
                value={year}
                onChangeText={setYear}
                placeholder="Year"
                keyboardType="number-pad"
            />
            <Button
                title="View Holidays"
                onPress={() =>
                navigation.navigate('HolidayList', { country: country.toUpperCase(), year: Number(year) })
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 },
});