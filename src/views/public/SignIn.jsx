import React, { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from './../../../firebaseConfig'
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth(app); 

  const navigation = useNavigation();

  async function handleLogin(user){
    try {
      if (user.email === "itemm@itemm.br") {
        navigation.navigate('NavigatorItemm');
      } else {
        navigation.navigate('NavigatorJovem');
      }
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  }

  const authSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log("Login de usuário:", user);
        Alert.alert("Usuário logado");
        handleLogin(user);
      })
      .catch(error => {
        console.error("Usuário não registrado:", error);
      });
  };
  
  return (
        
        <View style={styles.tela}>
            <Text style={styles.titulo}>Bem vindo!</Text>
            <Image source={require('./../images/logo.png')} style={styles.logo}/>
            <Text style={{...styles.texto, top: 280, maxWidth: 320}}>Faça login na sua conta:</Text>
              <TextInput
              style={{...styles.textInputs, top: 110}}
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
            style={styles.buttonEntrar}
            onPress={authSignIn}
            >
            <Text style={styles.textButtonEntrar}>Entrar</Text>
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
    top: 514,
  },
  buttonCadastrar: {
    color: '#b71fff',
    fontSize: 16,
    position: 'absolute',
    top: 210,
    left: '17%'
  },
  buttonEntrar:{
    backgroundColor: '#263868',
    height: 35,
    width: 130,
    position: 'absolute',
    top: 500,
    right:'10%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  textButtonEntrar:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default SignIn