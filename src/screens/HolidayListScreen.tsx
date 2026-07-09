import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useHolidays } from "../api/useHolidays";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'HolidayList'>;

export function HolidayListScreen({ route }: Props) {
    const { country, year } = route.params;
    const { data, isLoading, isError } = useHolidays(country, year);

    if (isLoading) return <ActivityIndicator style={styles.center} />
    if (isError) return <Text style={styles.center}>Something went wrong.</Text>;

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.localName && item.localName !== item.name && (
                        <Text style={styles.local}>{item.localName}</Text>
                    )}
                    <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 8 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  local: { fontSize: 13, color: '#666' },
  date: { fontSize: 13, color: '#999', marginTop: 4 },
  center: { flex: 1, textAlign: 'center', marginTop: 40 },
});