import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView} from 'react-native'
import React, { useState , useEffect} from 'react'
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db } from './../../../firebaseConfig'

import { MultipleSelectList } from 'react-native-dropdown-select-list'

const AvaliacoesItemm = () => {

  // const [selected, setSelected] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);

  //Select
  const [selectedTurma, setSelectedTurma] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState([]);
  const [selectedMetas, setSelectedMetas] = useState([]);
  const [selectedHabilidade, setSelectedHabilidade] = useState([]);
  const [selectedRelacionamento, setSelectedRelacionamento] = useState([]);
  
  useEffect(() => {
    async function getTurmas(){
      try {
        const q = query(collection(db, 'turmas'));
        const turmasDocs = await getDocs(q);
        const turmaData = [];
        turmasDocs.forEach((doc) => {
            turmaData.push(doc.data()); 
        });
        setTurmas(turmaData);
      } catch (error) {
        alert('Erro ao buscar as turmas: ' + error.message);
      }
    }
    async function getAlunos(){
      try {
        const q = query(collection(db, 'users'));
        const usersDocs = await getDocs(q);
        const alunosData = [];
        usersDocs.forEach((doc) => {
            alunosData.push(doc.data()); 
        });
        setAlunos(alunosData);
      } catch (error) {
        alert('Erro ao buscar as turmas: ' + error.message);
      }
    }
    getTurmas();
    getAlunos();
  }, []);

  const saveResultsToFirestore = async () => {
    try {
      const docRef = doc(db, 'users', selectedAluno[0]?.uid);
      await updateDoc(docRef, {
        Metas: selectedMetas,
        Habilidade: selectedHabilidade,
        Relacionamento: selectedRelacionamento,
      });
      alert('Resultados salvos com sucesso!');
    } catch (error) {
      alert('Erro ao salvar os resultados: ' + error.message);
    }
  };
  

  const handleTurmasSelection = (selectedTurma) => {
    setSelectedTurma(selectedTurma);
  };

  const handleAlunosSelection = (selectedAluno) => {
    setSelectedAluno(selectedAluno);
  
    // Se o objeto selectedAluno contiver uma propriedade uid, você pode acessá-la
    const alunoUid = selectedAluno[0]?.uid;
  
    // Agora você pode usar alunoUid onde necessário
    console.log('UID do aluno selecionado:', alunoUid);
  };
  

  const handleMetasSelection = (selectedValues) => {
    setSelectedMetas(selectedValues);
  };

  const handleHabilidadeSelection = (selectedValues) => {
    setSelectedHabilidade(selectedValues);
  };

  const handleRelacionamentoSelection = (selectedValues) => {
    setSelectedRelacionamento(selectedValues);
  };

  const metas = [
    {key:'1', value:'0'},
    {key:'2', value:'1'},
    {key:'3', value:'2'},
  ]

  const habilidade = [
    {key:'1', value:'0'},
    {key:'2', value:'1'},
    {key:'3', value:'2'},
  ]

  const relacionamento = [
    {key:'1', value:'0'},
    {key:'2', value:'1'},
    {key:'3', value:'2'},
  ]

  const enviarNotas = () => {
    saveResultsToFirestore()
    Alert.alert("Enviado!")
  };


  return (
    <ScrollView style={{flexGrow: 1}}>
    <View style={styles.tela}>
      <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
      <Text style={styles.title}>Avaliações</Text>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Turma   </Text>
            <MultipleSelectList 
            setSelected={handleTurmasSelection} 
            data={turmas} 
            save="value"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Nome   </Text>
            <MultipleSelectList 
            setSelected={handleAlunosSelection} 
            data={alunos}  
            save="value"
          />
        </View>
        {/* <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Data da Avaliação   </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={dataAvaliacao} 
            save="value"
            // label="Data da Avaliação"
          />
        </View> */}
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Cumprimento de Metas   </Text>
            <MultipleSelectList 
            setSelected={handleMetasSelection} 
            data={metas} 
            save="value"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Habilidade Técnica   </Text>
            <MultipleSelectList 
            setSelected={handleHabilidadeSelection} 
            data={habilidade} 
            save="value"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Relacionamento Interpessoal   </Text>
            <MultipleSelectList 
            setSelected={handleRelacionamentoSelection} 
            data={relacionamento} 
            save="value"
          />
        </View>
        <View>
            <TouchableOpacity
            style={styles.enviar}
            onPress={enviarNotas}
            >
            <Text style={styles.text}>Enviar</Text>
            </TouchableOpacity>
        </View>
        <View style={{ height: 500 }}></View>
    </View>
    </ScrollView>
  )
}

export default AvaliacoesItemm

const styles = StyleSheet.create({
  tela: {
    backgroundColor: '#ecfddc',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 107,
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
    //fontFamily: 'Roboto-Bold',
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
  enviar: {
    backgroundColor: '#263868',
    height: 35,
    width: 152,
    justifyContent: 'center',
    alignItems: 'center',
    top: 240,
    borderRadius: 10,
  },
  text: {
    color: '#FFFFFF',
  }
})