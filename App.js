import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProgressoJovem from './src/views/jovem/ProgressoJovem'
import CertificadoJovem from './src/views/jovem/CertificadoJovem'

import { auth } from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Certificado Jovem Aprendiz" 
        component={CertificadoJovem}
        options={{
          tabBarLabel: "Certificado",
          tabBarIcon: () => (
            <Icon name="certificate" size={30} color="#263868" />
          )
        }} 
      />
      <Tab.Screen 
        name="Progresso Jovem Aprendiz" 
        component={ProgressoJovem}
        options={{
          tabBarLabel: "Progresso",
          tabBarIcon: () => (
            <Icon name="spinner" size={30} color="#263868" />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


