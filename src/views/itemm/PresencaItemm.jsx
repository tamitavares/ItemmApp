import { View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity} from 'react-native'
import React, { useState , useEffect} from 'react'
import { collection, getDocs, query, addDoc, doc, updateDoc, arrayUnion, where } from "firebase/firestore";
import { db } from './../../../firebaseConfig'

import { SelectList } from 'react-native-dropdown-select-list'
// import { MultipleSelectList } from 'react-native-dropdown-select-list'


const PresencaItemm = () => {

const [turmas, setTurmas] = useState([]);
const [alunos, setAlunos] = useState([]);

//Select
const [selectedTurma, setSelectedTurma] = useState([]);
const [selectedFaltas, setSelectedFaltas] = useState([]);

useEffect(() => {
  async function getTurmas() {
    try {
      const q = query(collection(db, 'turmas'));
      const turmasDocs = await getDocs(q);
      const turmaData = [];
      turmasDocs.forEach((doc) => {
        turmaData.push(doc.data().nome);
      });
      setTurmas(turmaData);
      getAlunos();
    } catch (error) {
      alert('Erro ao buscar as turmas: ' + error.message);
    }
  }
  
  async function getAlunos() {
    try {
      console.log(selectedTurma)
      const q = query(collection(db, 'users'), where("turma", "==", selectedTurma));
      const usersDocs = await getDocs(q);
      const alunosData = [];
      usersDocs.forEach((doc) => {
        console.log(alunosData.push(doc.data().displayName));
      });
      console.log(alunosData)
  
      setAlunos(alunosData);
    } catch (error) {
      alert('Erro ao buscar os alunos: ' + error.message);
    }
  }
  
  getTurmas();
}, []);

const faltas = [
  {key:'1', value:'Presente'},
  {key:'2', value:'Ausente'},
]

const handleTurmasSelection = (selectedTurma) => {
    setSelectedTurma(selectedTurma);
};
const handleFaltasSelection = (aluno, falta) => {
  // console.log(selectedFaltas)
  // selectedFaltas.forEach((item) => {
  //   const nomeDoAluno = item.aluno;
  //   console.log(nomeDoAluno);
  // });
  const updatedSelection = [...selectedFaltas];
  const index = updatedSelection.findIndex((item) => item.aluno === aluno);

  if (index !== -1) {
    updatedSelection[index].falta = falta;
  } else {
    updatedSelection.push({ aluno, falta });
  }

  setSelectedFaltas(updatedSelection);
};

const saveResultsToFirestore = async (alunos, selectedTurma) => {
  try {
    selectedFaltas.forEach(async (item) => {
      const nomeDoAluno = item.aluno;
      console.log(nomeDoAluno);
  
      const q = query(collection(db, 'users'), where("displayName", "==", nomeDoAluno));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((documento) => {
        // console.log(documento.id, " => ", documento.data());
  
        // Corrigindo o acesso ao ID do documento
        const docRef = doc(db, 'users', documento.id);
  
        const faltaAluno = item.falta;
        console.log(faltaAluno);
  
        updateDoc(docRef, { "falta": faltaAluno });
        alert('Resultados salvos com sucesso!');
      });
    });
  } catch (error) {
    console.error("Erro:", error.message);
  }
 
};

const enviarNotas = () => {
  saveResultsToFirestore()
  Alert.alert("Enviado!")
};

const elementosAlunos = [];

  // Iterando sobre o array de alunos
  alunos.forEach((aluno, index) => {
    // Adicionando o elemento JSX ao array
    elementosAlunos.push(
      <Text key={index} style={{...styles.aluno, margin: 15, marginLeft: 0}}>
        {aluno}
      </Text>
    );});

  return (
    <View style={styles.tela}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        <Text style={styles.title}>Presença</Text>
        
        <View>
              <TouchableOpacity
              style={styles.enviar}
              onPress={enviarNotas}
              >
              <Text style={styles.text}>Enviar</Text>
              </TouchableOpacity>
          </View>

        {/* <View style={{...styles.selecoesNotas, top: 200}}>
            <Text style={styles.selecao}>Turma   </Text>
            <MultipleSelectList 
            setSelected={handleTurmasSelection} 
            data={turmas} 
            save="value"
          />
        </View> */}
        <View style={{...styles.selecoesNotas, top: 200}}>
            <Text style={styles.selecao}>Turma   </Text>
            <SelectList 
            setSelected={handleTurmasSelection} 
            data={turmas} 
            save="value"
            />
        </View>
        {selectedTurma.length > 0 && (
          <View>
            {alunos.map((aluno, index) => (
              <View key={index} style={{ ...styles.selecoesNotas, top: 220 }}>
                <Text style={{...styles.aluno, margin: 15, marginLeft: 0}}>
                  {aluno}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: selectedFaltas.find((item) => item.aluno === aluno && item.falta === 'presente') ? 'green' : 'gray',
                      padding: 10,
                      marginRight: 10,
                      borderRadius:10
                    }}
                    onPress={() => handleFaltasSelection(aluno, 'presente')}
                  >
                    <Text>Presente</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: selectedFaltas.find((item) => item.aluno === aluno && item.falta === 'ausente') ? 'red' : 'gray',
                      padding: 10,
                      borderRadius:10
                    }}
                    onPress={() => handleFaltasSelection(aluno, 'ausente')}
                  >
                    <Text>Ausente</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
          <View>
        </View>
    </View>
  )
}

export default PresencaItemm

const styles = StyleSheet.create({
  tela: {
    backgroundColor: '#ecfddc',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 107,
    position: 'absolute',
    top: 32,
    width: 179,
  },
  title: {
    color: '#000000',
    fontSize: 23,
    fontWeight: '700',
    left: 21,
    position: 'absolute',
    textAlign: 'left',
    top: 150,
  },
  selecao: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  selecoesNotas: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'left',
    width: 355,
    
  },
  aluno:{
    color: '#000000',
    fontSize: 20,
    fontWeight: '400',
  },
  enviar: {
    backgroundColor: '#263868',
    height: 35,
    width: 152,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 150,
  },
  text: {
    color: '#FFFFFF',
  }
})