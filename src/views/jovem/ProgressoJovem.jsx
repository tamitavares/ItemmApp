import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default ProgressoJovem = () => {
  return (
    <View style={styles.progressoJovem}>
      <View style={styles.div}>
        <Image style={styles.image} source={require('../images/logo.png')} />
        <View style={styles.overlap}>
          <Text style={styles.textWrapper}>Certificado</Text>
        </View>
        <View style={styles.overlapGroup}>
          <Text style={styles.textWrapper2}>Progresso</Text>
        </View>
        <View style={styles.overlapGroup2}>
          <View style={styles.rectangle} />
          <View style={styles.rectangle} />
          <Text style={styles.textWrapper3}>Mensagens</Text>
        </View>
        <View style={styles.rectangle2} />
        <View style={styles.rectangle3} />
        <Text style={styles.textWrapper4}>Avaliações:</Text>
        <Text style={styles.textWrapper5}>Presença:</Text>
        <Text style={styles.textWrapper6}>Sair</Text>
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
  overlap: {
    backgroundColor: "#263868",
    height: 47,
    left: 73,
    position: "absolute",
    top: 755,
    width: 69,
  },
  textWrapper: {
    color: "#ffffff",
    //fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "400",
    left: 0,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 17,
    width: 69,
  },
  overlapGroup: {
    backgroundColor: "#263868",
    height: 47,
    left: 145,
    position: "absolute",
    top: 755,
    width: 69,
  },
  textWrapper2: {
    color: "#ffffff",
    //fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "400",
    left: 1,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 17,
    width: 69,
  },
  overlapGroup2: {
    height: 47,
    left: 218,
    position: "absolute",
    top: 755,
    width: 70,
  },
  rectangle: {
    backgroundColor: "#263868",
    height: 47,
    left: 0,
    position: "absolute",
    top: 0,
    width: 69,
  },
  textWrapper3: {
    color: "#ffffff",
    //fontFamily: "Roboto-Regular",
    fontSize: 12,
    fontWeight: "400",
    left: 1,
    letterSpacing: 0,
    position: "absolute",
    textAlign: "center",
    top: 16,
    width: 69,
  },
  rectangle2: {
    backgroundColor: "#99cc6a",
    borderRadius: 10,
    height: 123,
    left: 21,
    position: "absolute",
    top: 314,
    width: 318,
  },
  rectangle3: {
    backgroundColor: "#99cc6a",
    borderRadius: 10,
    height: 123,
    left: 21,
    position: "absolute",
    top: 511,
    width: 318,
  },
  textWrapper4: {
    color: "#000000",
    //fontFamily: "Roboto-Bold",
    fontSize: 20,
    fontWeight: "700",
    left: 21,
    letterSpacing: 0,
    position: "absolute",
    top: 274,
  },
  textWrapper5: {
    color: "#000000",
    //fontFamily: "Roboto-Bold",
    fontSize: 20,
    fontWeight: "700",
    left: 21,
    letterSpacing: 0,
    position: "absolute",
    top: 472,
  },
  textWrapper6: {
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
