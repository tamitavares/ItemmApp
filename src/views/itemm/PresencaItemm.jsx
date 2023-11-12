import { View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity} from 'react-native'
import React, { useState , useEffect} from 'react'
import { collection, getDocs, query, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from './../../../firebaseConfig'

import { MultipleSelectList } from 'react-native-dropdown-select-list'


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
      const turmasData = [];
      const alunosData = [];
      turmasDocs.forEach((doc) => {
        turmasData.push(doc.data().Turma); 
        const alunos = doc.data().Alunos;
        alunos.forEach((aluno) => {
          alunosData.push(aluno); 
        });
      });
      setTurmas(turmasData);
      setAlunos(alunosData);
    } catch (error) {
      alert('Erro ao buscar as turmas: ' + error.message);
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
      await addDoc(collection(db, 'presenca'), {
        Turma: selectedTurma,
        Presencas: alunos.map(aluno => ({ nome: aluno, presente: true }))
      });
    alert('Resultados salvos com sucesso!');
  } catch (error) {
    alert('Erro ao salvar os resultados: ' + error.message);
  }
};

const enviarNotas = () => {
  saveResultsToFirestore()
  Alert.alert("Enviado!")
};

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

        <View style={{...styles.selecoesNotas, top: 200}}>
            <Text style={styles.selecao}>Turma   </Text>
            <MultipleSelectList 
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