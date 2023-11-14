import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CertificadoItemm = () => {

const navigation = useNavigation();

const navigateSignUpJovem = () => {
    navigation.navigate('SignUpJovem'); 
};
const navigateSignIn = () => {
    navigation.navigate('SignIn'); 
};

  return (
    <View style={styles.tela}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
            style={styles.button}
            onPress={navigateSignUpJovem}
            >
            <Text style={styles.text}>Jovem Aprendiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={navigateSignIn}
            >
            <Text style={styles.text}>Itemm</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default CertificadoItemm

const styles = StyleSheet.create({
  tela: {
    backgroundColor: '#ecfddc',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 107,
    position: 'absolute',
    top: 32,
    width: 179,
  },
  button: {
    backgroundColor: '#263868',
    height: 60,
    width: 152,
    top: 500,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  }
})