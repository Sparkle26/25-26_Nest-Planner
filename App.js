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
      {/* <Stack.Navigator initialRouteName="Login"> */}
      <Stack.Navigator >
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




