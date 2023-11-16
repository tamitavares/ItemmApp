import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {Table, Row} from 'react-native-table-component';
import { app, db } from './../../../firebaseConfig'
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell']);

export default ProgressoJovem = () => {

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [presencas, setPresencas] = useState([]);
  const [id, setId] = useState();

  const auth = getAuth(app); 

  useEffect(() => {
    // Função para buscar avaliações no Firestore
    const getAvaliacoes = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          where('email', '==', auth.currentUser.email)
        );
        const avaliacoesDocs = await getDocs(q);
        const avaliacoesData = [];
        avaliacoesData.push([
          "Metas", "Habilidade Interpessoal", "Relacionamento"
        ])
        avaliacoesDocs.forEach((doc) => {
          setId(doc.id);
          const metas = doc.data().metas;
          const habilidade = doc.data().habilidade;
          const relacionamento = doc.data().relacionamento;

          avaliacoesData.push([
            metas, habilidade, relacionamento
          ]);
        });
        setAvaliacoes(avaliacoesData);
      } catch (error) {
        alert('Erro ao buscar as avaliações: ' + error.message);
      }
    };

    getAvaliacoes();
  }, []);

  useEffect(() => {
    // Função para buscar presenças no Firestore
   const getPresencas = async () => {
    try {
      const q = collection(db, `users/${id}/faltas`)
      
      const presencasDocs = await getDocs(q);
      const presencasData = [];
      presencasData.push([
        "Data", "Presença"
      ])

      presencasDocs.forEach((doc) => {

        const dataEmMilissegundos = doc.data().data.seconds * 1000;
        const data = new Date(dataEmMilissegundos);

        const dataFormatada = data.toLocaleDateString('pt-BR');

        const falta = doc.data().falta;

        presencasData.push([
          dataFormatada, falta
        ]);
      });
      setPresencas(presencasData);
    } catch (error) {
      alert('Erro ao buscar as presenças: ' + error.message);
    }
  };

    if(id != undefined)
      getPresencas();
  }, [id]);

  return (
    <ScrollView>
      <View style={styles.progressoJovem}>
        <View style={styles.div}>
          <Image style={styles.image} source={require('../images/logo.png')} />
          
        <Table borderStyle={{ borderColor: 'Black' }}>
          {avaliacoes.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={{
                ...styles.table,
                top: 314,
                height: 'auto',
                backgroundColor: index === 0 ? '#99cc6a' : '#ffffff',
                borderColor: 'black',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                ...(index === 0 && { borderTopLeftRadius: 12, borderTopRightRadius: 12 }),
                ...(index === avaliacoes.length - 1 && { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }),
              }}
            />
          ))}
        </Table>

        <Table borderStyle={{ borderColor: 'Black' }}>
          {presencas.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={{
                ...styles.table,
                top: 380,
                height: 25,
                backgroundColor: index === 0 ? '#99cc6a' : '#ffffff',
                borderColor: 'black',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                ...(index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10 }),
                ...(index === presencas.length - 1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }),
              }}
            />
          ))}
        </Table>

        <Text style={{...styles.textWrapper,top: 274}}>Avaliações:</Text>
        <Text style={{...styles.textWrapper,top: 415}}>Presença:</Text>
        <Text style={styles.textWrapper2}>Sair</Text>
        <Text style={styles.p}>Aqui está o seu progresso:</Text>
       
        </View>
      </View>
    </ScrollView>
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
