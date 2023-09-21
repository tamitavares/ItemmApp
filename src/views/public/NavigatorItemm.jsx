//ItemmTabs
import AnalisesItemm from '../itemm/AnalisesItemm'
import AvaliacoesItemm from '../itemm/AvaliacoesItemm'
import CertificadoItemm from '../itemm/CertificadoItemm'
import HomeItemm from '../itemm/HomeItemm'
import PresencaItemm from '../itemm/PresencaItemm'

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

const NavigatorItemm = () => {
    return (
      <ItemmTabs />
    )
  }
  
export default NavigatorItemm