import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default CertificadoJovem = () => {
  return (
    <View style={styles.certificadoJovem}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        <View style={styles.divWrapper}>
          <Text style={styles.textWrapper4}>Solicitar certificado</Text>
        </View>
        <View style={styles.overlapGroup2}>
          <Text style={styles.textWrapper5}>Baixar certificado</Text>
        </View>
        <Text style={styles.textWrapper6}>Sair</Text>
        <Text style={styles.textWrapper7}>Emissão de Certificado</Text>
        <Text style={styles.aEmissaoDoSeu}>
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
  overlap: {
    backgroundColor: '#263868',
    height: 47,
    left: 73,
    position: 'absolute',
    top: 755,
    width: 69,
  },
  textWrapper: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
    position: 'absolute',
    textAlign: 'center',
    width: 69,
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
  overlap2: {
    height: 47,
    left: 218,
    position: 'absolute',
    top: 755,
    width: 70,
  },
  rectangle: {
    backgroundColor: '#263868',
    height: 47,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 69,
  },
  textWrapper3: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '400',
    left: 1,
    letterSpacing: 0,
    lineHeight: 16,
    position: 'absolute',
    textAlign: 'center',
    top: 16,
    width: 69,
  },
  divWrapper: {
    backgroundColor: '#263868',
    borderRadius: 10,
    height: 53,
    left: 68,
    position: 'absolute',
    top: 468,
    width: 200,
  },
  textWrapper4: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
    left: 12,
    letterSpacing: 0,
    lineHeight: 28,
    position: 'absolute',
    textAlign: 'left',
    top: 14,
  },
  overlapGroup2: {
    backgroundColor: '#263868',
    borderRadius: 10,
    height: 53,
    left: 68,
    position: 'absolute',
    top: 556,
    width: 200,
  },
  textWrapper5: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
    left: 20,
    letterSpacing: 0,
    lineHeight: 28,
    position: 'absolute',
    textAlign: 'left',
    top: 14,
  },
  textWrapper6: {
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
  textWrapper7: {
    color: '#000000',
    //fontFamily: 'Roboto-Bold',
    fontSize: 23,
    fontWeight: '700',
    left: 21,
    letterSpacing: 0,
    lineHeight: 32,
    position: 'absolute',
    textAlign: 'left',
    top: 185,
  },
  aEmissaoDoSeu: {
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
