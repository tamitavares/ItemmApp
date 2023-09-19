import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

export default SignIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.div}>
        <Text style={styles.textWrapper}>Bem vindo ao ITEMM</Text>
        <Text style={styles.p}>Faça login na sua conta:</Text>
        <Text style={styles.textWrapper2}>Instituto Técnico Educacional Mirian Menchini</Text>
        <View style={styles.overlapGroup}>
          <Text style={styles.textWrapper3}>Email</Text>
        </View>
        <View style={styles.overlap}>
          <View style={styles.rectangle} />
          <TouchableOpacity style={styles.celular}>
            <Text style={styles.textWrapper4}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.celularWrapper}>
          <View style={styles.divWrapper}>
            <Text style={styles.textWrapper5}>Cadastre-se</Text>
          </View>
        </View>
        <View style={styles.overlap2}>
          <Text style={styles.textWrapper3}>Senha</Text>
        </View>
        <Text style={styles.textWrapper6}>Ainda não tem conta?</Text>
        <Text style={styles.textWrapper7}>Esqueceu a senha?</Text>
        <Image style={styles.image} source={require('./images/logo.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecfddc",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  div: {
    backgroundColor: "#ecfddc",
    height: 800,
    position: "relative",
    width: 360,
  },
  textWrapper: {
    color: "#000000",
    //fontFamily: "Roboto-Bold",
    fontSize: 23,
    fontWeight: "700",
    left: 19,
    letterSpacing: 0,
    position: "absolute",
    top: 244,
  },
  p: {
    color: "#000000",
    //fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "400",
    left: 21,
    letterSpacing: 0,
    position: "absolute",
    top: 354,
  },
  textWrapper2: {
    color: "#000000",
    //fontFamily: "Roboto-Medium",
    fontSize: 14,
    fontWeight: "500",
    left: 19,
    letterSpacing: 0,
    position: "absolute",
    top: 281,
  },
  overlapGroup: {
    backgroundColor: "#99cc6a",
    borderRadius: 10,
    height: 35,
    left: 18,
    position: "absolute",
    top: 404,
    width: 318,
  },
  textWrapper3: {
    color: "#000000",
    //fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "400",
    left: 14,
    letterSpacing: 0,
    position: "absolute",
    top: 8,
  },
  overlap: {
    height: 35,
    left: 272,
    position: "absolute",
    top: 514,
    width: 72,
  },
  rectangle: {
    backgroundColor: "#263868",
    borderRadius: 10,
    height: 35,
    left: 5,
    position: "absolute",
    top: 0,
    width: 60,
  },
  celular: {
    height: 16,
    left: 0,
    position: "absolute",
    top: 9,
    width: 72,
  },
  textWrapper4: {
    color: "#ffffff",
    //fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "400",
    left: 0,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 0,
    width: 70,
  },
  celularWrapper: {
    backgroundColor: "#263868",
    borderRadius: 10,
    height: 35,
    left: 242,
    position: "absolute",
    top: 609,
    width: 100,
  },
  divWrapper: {
    height: 16,
    left: 8,
    position: "relative",
    top: 9,
    width: 88,
  },
  textWrapper5: {
    color: "#ffffff",
    //fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "400",
    left: 0,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 0,
    width: 86,
  },
  overlap2: {
    backgroundColor: "#99cc6a",
    borderRadius: 10,
    height: 35,
    left: 18,
    position: "absolute",
    top: 455,
    width: 318,
  },
  textWrapper6: {
    color: "#000000",
    //fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "400",
    left: 19,
    letterSpacing: 0,
    position: "absolute",
    top: 617,
  },
  textWrapper7: {
    color: "#263868",
    //fontFamily: "Roboto-Medium",
    fontSize: 14,
    fontWeight: "500",
    left: 21,
    letterSpacing: 0,
    position: "absolute",
    top: 522,
  },
  image: {
    height: 131,
    left: 63,
    position: "absolute",
    top: 57,
    width: 219,
  },
});