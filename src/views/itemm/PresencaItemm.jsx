import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useState , useEffect} from 'react'
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { db } from './../../../firebaseConfig'

import { MultipleSelectList } from 'react-native-dropdown-select-list'


const PresencaItemm = () => {

const [turmas, setTurmas] = useState([]);
const [alunos, setAlunos] = useState([]);

//Select
const [selectedTurma, setSelectedTurma] = useState([]);
const [SelectedFaltas, setSelectedFaltas] = useState([]);

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
const handleFaltasSelection = (selectedValues) => {
  setSelectedFaltas(selectedValues);
};

  return (
    <View style={styles.tela}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        <Text style={styles.title}>Presença</Text>
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
            <View style={{...styles.selecoesNotas, top: 220}}>
              <Text key={index} style={styles.aluno}>
                {aluno}
              </Text>
              <MultipleSelectList 
                setSelected={handleFaltasSelection} 
                data={faltas} 
                save="value"
              />
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
    width: 355
  },
  aluno:{
    color: '#000000',
    fontSize: 20,
    fontWeight: '400',
  }
})