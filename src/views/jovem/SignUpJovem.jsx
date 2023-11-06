import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

//Firebase configs----------------------------------------------------------
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

import { app, db } from './../../../firebaseConfig'
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';

const auth = getAuth(app);
//--------------------------------------------------------------------------

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigation = useNavigation();

  const navigateToSignIn = () => {
    navigation.navigate('SignIn'); 
  };

  const authSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid; 
      const docRef = await addDoc(collection(db, 'users'), {
        email: email,
        displayName: displayName,
        phoneNumber: phoneNumber,
        uid: uid, 
      });
      console.log('Document written with ID: ', docRef.id);
      Alert.alert('Usuário ' + displayName + ' cadastrado com sucesso!');
      navigateToSignIn();
    } catch (error) {
      console.error('Erro no SignUp:', error);
    }
  };

  return (
    <View style={styles.tela}>
            <Text style={styles.titulo}>Criar Conta</Text>
            <Image source={require('./../images/logo.png')} style={styles.logo}/>
            <Text style={{...styles.texto, top: 280, maxWidth: 320}}>Crie uma conta para acessar todas as
funcionalidades do nosso aplicativo.</Text>
            <TextInput
              style={{...styles.textInputs, top: 110}}
              placeholder="   Nome"
              placeholderTextColor="white" 
              onChangeText={(text) => setDisplayName(text)}
              value={displayName}
            /> 
            <TextInput
              style={{...styles.textInputs}}
              placeholder="   Telefone"
              placeholderTextColor="white" 
              onChangeText={(text) => {
                if (text.startsWith('+55')) {
                  setPhoneNumber(text);
                } else {
                  setPhoneNumber(`+55${text}`);
                } 
              }}
              value={phoneNumber}
              keyboardType="phone-pad"
            /> 
              <TextInput
              style={{...styles.textInputs}}
              placeholder="   Email"
              placeholderTextColor="white" 
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            /> 
              <TextInput
              style={{...styles.textInputs}}
              placeholder="   Senha"
              placeholderTextColor="white" 
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />            
  
              
            <TouchableOpacity
            style={{...styles.buttonCadastrar, top: 600}}
            onPress={authSignUp}
            >
            <Text style={styles.textButtonCadastrar}>Cadastrar</Text>
            </TouchableOpacity>

            <Text style={styles.texto}>Já tem conta?</Text>
            <TouchableOpacity
            onPress={navigateToSignIn}
            >
            <Text style={styles.buttonCadastro}>Entrar</Text>
            </TouchableOpacity>
              
                      
        </View>
      );
    };



const styles = StyleSheet.create({
  logo:{
    height: 150,
    resizeMode: 'cover', 
    top: 0,
    width: 150,
    margin: 40
  },
  tela: {
    backgroundColor: '#fafafa',
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    color: '#000000',
    fontSize: 23,
    fontWeight: '700',
    left: 40,
    position: 'absolute',
    top: 240,
  },
  justifyItems:{
    display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'
  },
  textInputs: {
    backgroundColor: '#99CC6A',
    borderRadius: 10,
    height: 35,
    width: 318,
    top: 110,
    margin: 10,
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 10,
  },
  texto: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    left: 41,
    position: 'absolute',
    top: 675,
  },
  buttonCadastrar:{
    backgroundColor: '#263868',
    height: 35,
    width: 130,
    position: 'absolute',
    top: 670,
    right:'10%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  textButtonCadastrar:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonCadastro: {
    color: '#99CC6A',
    fontSize: 16,
    position: 'absolute',
    top: 225,
    left: '17%',
    fontWeight: '700',
  },
});

export default SignUp;
