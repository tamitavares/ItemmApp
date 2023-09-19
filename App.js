import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// JovemTabs
import ProgressoJovem from './src/views/jovem/ProgressoJovem'
import CertificadoJovem from './src/views/jovem/CertificadoJovem'

//ItemmTabs
import AnalisesItemm from './src/views/itemm/AnalisesItemm'
import AvaliacoesItemm from './src/views/itemm/AvaliacoesItemm'
import CertificadoItemm from './src/views/itemm/CertificadoItemm'
import HomeItemm from './src/views/itemm/HomeItemm'
import PresencaItemm from './src/views/itemm/PresencaItemm'

import { auth } from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();


function ItemmTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Mensagens Itemm" 
        component={HomeItemm}
        options={{
          tabBarLabel: "Mensagens",
          tabBarIcon: () => (
            <Icon name="envelope" size={30} color="#263868" />
          )
        }} 
      />
      <Tab.Screen 
        name="Certificado Itemm" 
        component={CertificadoItemm}
        options={{
          tabBarLabel: "Certificado",
          tabBarIcon: () => (
            <Icon name="certificate" size={30} color="#263868" />
          )
        }} 
      />
      <Tab.Screen 
        name="Presença Itemm" 
        component={PresencaItemm}
        options={{
          tabBarLabel: "Presença",
          tabBarIcon: () => (
            <Icon name="spinner" size={30} color="#263868" />
          )
        }} 
      />
      <Tab.Screen 
        name="Avaliações Itemm" 
        component={AvaliacoesItemm}
        options={{
          tabBarLabel: "Avaliações",
          tabBarIcon: () => (
            <Icon name="star" size={30} color="#263868" />
          )
        }} 
      />
      <Tab.Screen 
        name="Análises Itemm" 
        component={AnalisesItemm}
        options={{
          tabBarLabel: "Análises",
          tabBarIcon: () => (
            <Icon name="line-chart" size={30} color="#263868" />
          )
        }} 
      />
    </Tab.Navigator>
  );
}


function JovemTabs() {
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
      <ItemmTabs />
    </NavigationContainer>
  );
}


