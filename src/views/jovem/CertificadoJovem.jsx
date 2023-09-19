import React from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';

export default CertificadoJovem = () => {

  const solicitarCertificado = () => {
    Alert.alert("Solicitação de certificado executada")
  };
  const baixarCertificado = () => {
    Alert.alert("Certificado baixado")
  };


  return (
    <View style={styles.certificadoJovem}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        
        <View style={{...styles.button, left: 68, top: 468}}>
          <Button
          onPress={solicitarCertificado}
          title="Solicitar certificado"
          color='#263868'
          />
        </View>
        <View style={{...styles.button, left: 68, top: 556}}>
          <Button
          onPress={baixarCertificado}
          title="Baixar certificado"
          color='#263868'
          />
        </View>
        <Text style={styles.logout}>Sair</Text>
        <Text style={styles.title}>Emissão de Certificado</Text>
        <Text style={styles.titlePrincipal}>
          A emissão do seu certificado será feita pelo ITEMM. Aguarde a notificação em sua caixa de entrada.
          {'\n'}
          Caso não tenha recebido ainda envie uma solicitação.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  certificadoJovem: {
    backgroundColor: '#ecfddc',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#ecfddc',
    height: 800,
    overflow: 'hidden',
    position: 'relative',
    width: 360,
  },
  image: {
    height: 107,
    left: 88,
    position: 'absolute',
    top: 32,
    width: 179,
  },
  overlapGroup: {
    backgroundColor: '#263868',
    height: 47,
    left: 145,
    position: 'absolute',
    top: 755,
    width: 69,
  },
  textWrapper2: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
    left: 1,
    letterSpacing: 0,
    position: 'absolute',
    textAlign: 'center',
    top: 17,
    width: 69,
  },
  button: {
    borderRadius: 30,
    height: 53,
    position: 'absolute',
    width: 200,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
    left: 12,
    position: 'absolute',
    textAlign: 'left',
    top: 14,
  },
  logout: {
    color: '#263868',
    //fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    left: 314,
    letterSpacing: 0,
    position: 'absolute',
    textAlign: 'left',
    top: 18,
  },
  title: {
    color: '#000000',
    //fontFamily: 'Roboto-Bold',
    fontSize: 23,
    fontWeight: '700',
    left: 21,
    position: 'absolute',
    textAlign: 'left',
    top: 185,
  },
  titlePrincipal: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '400',
    left: 21,
    letterSpacing: 0,
    lineHeight: 28,
    position: 'absolute',
    textAlign: 'left',
    top: 259,
    width: 293,
  },
});
