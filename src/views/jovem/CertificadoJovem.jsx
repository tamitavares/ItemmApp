import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, Linking } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LogBox } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where, storage } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from '../../../firebaseConfig';


LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell']);

export default CertificadoJovem = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const firestore = getFirestore();11


  useEffect(() => {
    const carregarOpcoesDropdown = async () => {
      try {
        const userId = currentUser ? currentUser.uid : null;
        console.log('UserID:', userId); // Log do UserID
  
        const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
        const userSnapshot = await getDocs(userQuery);
  
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0]; // Pegamos o primeiro documento, pois esperamos que apenas um usuário corresponda ao uid
          const certificadosQuery = query(collection(userDoc.ref, 'certificados'));
          const certificadosSnapshot = await getDocs(certificadosQuery);
          const opcoes = [];
  
          certificadosSnapshot.forEach((certificadoDoc) => {
            opcoes.push({
              label: certificadoDoc.data().nome,
              value: certificadoDoc.data().nome,
            });
          });
          setDropdownOptions(opcoes);
        } else {
          console.log('Nenhum usuário encontrado com o uid:', userId);
        }
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

  const storage = getStorage();

  const baixarCertificado = async () => {
    if (selectedOption) {
      const storageRef = ref(storage, selectedOption.value.uri);
      getDownloadURL(storageRef)
        .then((url) => {
          Linking.openURL(url).catch((err) => console.error('Erro ao abrir o PDF:', err));
          Alert.alert("Certificado baixado");
        })
        .catch((error) => {
          console.error('Erro ao baixar o certificado:', error);
        });
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
