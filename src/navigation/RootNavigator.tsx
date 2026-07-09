import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { HolidayListScreen } from "../screens/HolidayListScreen";

export type RootStackParamList = {
    Home: undefined;
    HolidayList: { country: string; year: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name ="Home" component={HomeScreen} options={{ title: 'Know Your Holidays' }} />
            <Stack.Screen name="HolidayList" component={HolidayListScreen} options={{ title: 'Holidays' }} />
        </Stack.Navigator>
    )
}