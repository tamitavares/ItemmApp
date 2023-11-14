import NavigatorJovem from './src/views/public/NavigatorJovem'
import NavigatorItemm from './src/views/public/NavigatorItemm'
import SignIn from './src/views/public/SignIn'
import GetStarted from './src/views/public/GetStarted'
import SignUpJovem from './src/views/jovem/SignUpJovem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="GetStarted" 
        component={GetStarted}
      />
      <Stack.Screen 
        name="SignUpJovem" 
        component={SignUpJovem}
      />
      <Stack.Screen 
        name="NavigatorJovem" 
        component={NavigatorJovem}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="NavigatorItemm" 
        component={NavigatorItemm}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="SignIn" 
        component={SignIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStackNavigator />
    </NavigationContainer>
  );
}


