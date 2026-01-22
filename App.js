import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import  LoginScreen  from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/calendarScreen';
// require('dotenv').config();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#004B98' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}  // hiding header for login only
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
