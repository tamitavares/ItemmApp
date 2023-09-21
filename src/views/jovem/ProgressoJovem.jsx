import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {Table, Row} from 'react-native-table-component';

export default ProgressoJovem = () => {
  return (
    <View style={styles.progressoJovem}>
      <View style={styles.div}>
        <Image style={styles.image} source={require('../images/logo.png')} />
        
        <Table borderStyle={{borderColor: 'Black'}}>
          {tabelaAvaliacao.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[
                { ...styles.table, top: 314,  height: 25, backgroundColor: index === 0 ? '#99cc6a' : '#ffffff'}, 
                { borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black' },
                index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10 }, 
                index === tabelaAvaliacao.length - 1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
              ]}
              textStyle={{ textAlign: 'center'}}
            />
          ))}
        </Table>
        
        <Table borderStyle={{borderColor: 'Black'}}>
          {tabelaPresenca.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[
                { ...styles.table, top:380,  height: 25, backgroundColor: index === 0 ? '#99cc6a' : '#ffffff'}, 
                { borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black' },
                index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10 }, 
                index === tabelaPresenca.length - 1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
              ]}
              textStyle={{ textAlign: 'center'}}
            />
          ))}
        </Table>

        
        <Text style={{...styles.textWrapper,top: 274}}>Avaliações:</Text>
        <Text style={{...styles.textWrapper,top: 472}}>Presença:</Text>
        <Text style={styles.textWrapper2}>Sair</Text>
        <Text style={styles.p}>Aqui está o seu progresso:</Text>
      </View>
    </View>
  );
};

const dados = {
  avaliacao: [
    ['Dia', 'Nome da prova', 'Nota'],
    ['01/02/2023', 'Prova 1', '2'],
    ['02/02/2023', 'Prova 2', '2'],
    ['03/02/2023', 'Prova 3', '1'],
    ['04/02/2023', 'Prova 4', '0'],
  ],
  presenca: [
    ['Dia', 'Presença'],
    ['01/02/2023', 'Presente'],
    ['02/02/2023', 'Presente'],
    ['03/02/2023', 'Ausente'],
    ['04/02/2023', 'Presente'],
  ],
};

const tabelaAvaliacao = dados.avaliacao;
const tabelaPresenca = dados.presenca;


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
  table: {
    width: 318,
    left: 21,
    maxHeight: 125,
  },
});
