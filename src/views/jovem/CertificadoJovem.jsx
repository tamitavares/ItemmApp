import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, Linking } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LogBox } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';


LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell']);

export default CertificadoJovem = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const firestore = getFirestore();


  useEffect(() => {
    const carregarOpcoesDropdown = async () => {
      try {
        const userId = currentUser ? currentUser.uid : null;
        const certificadosQuery = query(collection(db, `users/${userId}/certificados`))
        const certificadosSnapshot = await getDocs(certificadosQuery);
        const opcoes = [];
    
        for (const certificadoDoc of certificadosSnapshot.docs) {
          const detalhesCollection = collection(certificadoDoc.ref, 'certificado');
          const detalhesQuery = query(detalhesCollection);
          const detalhesSnapshot = await getDocs(detalhesQuery);

          detalhesSnapshot.forEach((detalheDoc) => {
            opcoes.push({
              label: detalheDoc.data().nome,
              value: detalheDoc.data().nome,
            });
          });
        }
        setDropdownOptions(opcoes);
      } catch (error) {
        console.error('Erro ao carregar opções de dropdown:', error);
      }
    };
  carregarOpcoesDropdown();
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const baixarCertificado = async () => {
    if (selectedOption) {
      const refCertificado = collection(firestore, selectedOption.value.uri);
      const downloadURL = await getDownloadURL(refCertificado);
      Linking.openURL(downloadURL).catch((err) => console.error('Erro ao abrir o PDF:', err));
      Alert.alert("Certificado baixado");
    } else {
      Alert.alert('Selecione uma opção antes de baixar o certificado');
    }
  };

  return (
    <View style={styles.certificadoJovem}>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../images/logo.png')}
      />

      <View style={styles.dropdown}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedOption({ label: value, value })}
          items={dropdownOptions}
          placeholder={{ label: 'Selecione uma opção', value: null }}
        />
      </View>

      <View style={styles.button}>
        <Button
          onPress={baixarCertificado}
          title="Baixar certificado"
          color='#263868'
        />
      </View>

      <Text style={styles.logout}>Sair</Text>
      <Text style={styles.title}>Emissão de Certificado</Text>
      <Text style={styles.titlePrincipal}>
        Escolha o certificado que deseja baixar com base nas opções disponíveis:
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
  dropdown: {
    display: 'flex',
    height: 40,
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 350,
    justifyContent:'space-evenly',
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
  button: {
    display:'flex',
    backgroundColor: '#263868',
    height: 53,
    width: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    left: 68,
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
