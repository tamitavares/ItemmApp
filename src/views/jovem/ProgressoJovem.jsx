import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default ProgressoJovem = () => {
  return (
    <View style={styles.progressoJovem}>
      <View style={styles.div}>
        <Image style={styles.image} source={require('../images/logo.png')} />
        <View style={{...styles.rectangle,top: 314,width: 318,}} />
        <View style={{...styles.rectangle,top: 511,width: 318,}} />
        <Text style={{...styles.textWrapper,top: 274}}>Avaliações:</Text>
        <Text style={{...styles.textWrapper,top: 472}}>Presença:</Text>
        <Text style={styles.textWrapper2}>Sair</Text>
        <Text style={styles.p}>Aqui está o seu progresso:</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressoJovem: {
    backgroundColor: "#ecfddc",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  div: {
    backgroundColor: "#ecfddc",
    height: 800,
    overflow: "hidden",
    position: "relative",
    width: 360,
  },
  image: {
    height: 107,
    left: 88,
    position: "absolute",
    top: 32,
    width: 179,
  },
  rectangle: {
    backgroundColor: "#99cc6a",
    borderRadius: 10,
    height: 123,
    left: 21,
    position: "absolute",
  }, 
  textWrapper: {
    color: "#000000",
    //fontFamily: "Roboto-Bold",
    fontSize: 20,
    fontWeight: "700",
    left: 21,
    letterSpacing: 0,
    position: "absolute",
  },
  textWrapper2: {
    color: "#263868",
    //fontFamily: "Roboto-Medium",
    fontSize: 14,
    fontWeight: "500",
    left: 314,
    letterSpacing: 0,
    position: "absolute",
    top: 18,
  },
  p: {
    color: "#000000",
    //fontFamily: "Roboto-Bold",
    fontSize: 23,
    fontWeight: "700",
    left: 21,
    letterSpacing: 0,
    position: "absolute",
    top: 185,
  },
});
