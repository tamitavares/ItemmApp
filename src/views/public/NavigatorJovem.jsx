// JovemTabs
import ProgressoJovem from '../jovem/ProgressoJovem'
import CertificadoJovem from '../jovem/CertificadoJovem'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

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
          ),
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Progresso Jovem Aprendiz" 
        component={ProgressoJovem}
        options={{
          tabBarLabel: "Progresso",
          tabBarIcon: () => (
            <Icon name="spinner" size={30} color="#263868" />
          ),
          headerShown: false 
        }} 
      />
    </Tab.Navigator>
  );
}

const NavigatorJovem = () => {
    return (
      <JovemTabs />
    )
  }
  
export default NavigatorJovem