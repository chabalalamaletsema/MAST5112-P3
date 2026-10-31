import { Stack } from 'expo-router';
import { MenuProvider } from '../context/MenuContext';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'African Crowns Place' }} />
        <Stack.Screen name="add-dish" options={{ title: 'Add Dish' }} />
        <Stack.Screen name="edit-dish" options={{ title: 'Edit Dish' }} />
        <Stack.Screen name="statistics" options={{ title: 'Menu Statistics' }} />
      </Stack>
    </MenuProvider>
  );
}
