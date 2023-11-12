import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './../../../firebaseConfig';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

const CadastroScreen = () => {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [emailEmpresa, setEmailEmpresa] = useState('');
  const [nomeTurma, setNomeTurma] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);


  const [selectedAluno, setSelectedAluno] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    async function listarUsuarios() {
      try {
        const usuariosSnapshot = await getDocs(collection(db, 'users'));
        const usuariosData = usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
      }
    }
    async function getAlunos(){
      try {
        const q = query(collection(db, 'users'));
        const usersDocs = await getDocs(q);
        const alunosData = [];
        usersDocs.forEach((doc) => {
            alunosData.push(doc.data().displayName); 
        });
        setAlunos(alunosData);
      } catch (error) {
        alert('Erro ao buscar as turmas: ' + error.message);
      }
    }
    async function getTurmas(){
      try {
        const q = query(collection(db, 'turmas'));
        const turmasDocs = await getDocs(q);
        const turmaData = [];
        turmasDocs.forEach((doc) => {
            turmaData.push(doc.data().nome); 
        });
        setTurmas(turmaData);
      } catch (error) {
        alert('Erro ao buscar as turmas: ' + error.message);
      }
    }

    listarUsuarios();
    getAlunos();
    getTurmas();
  }, []);

  const criarEmpresa = async () => {
    try {
      const empresaData = { nome: nomeEmpresa, email: emailEmpresa };
      await addDoc(collection(db, 'empresas'), empresaData);
      Alert.alert('Empresa criada com sucesso!');
      setNomeEmpresa('');
      setEmailEmpresa('');
    } catch (error) {
      Alert.alert('Erro ao criar empresa:', error.message);
    }
  };

  const criarTurma = async () => {
    try {
      const turmaData = { nome: nomeTurma };
      await addDoc(collection(db, 'turmas'), turmaData);
      Alert.alert('Turma cadastrada com sucesso!');
      setNomeTurma('');
    } catch (error) {
      Alert.alert('Erro ao cadastrar turma:', error.message);
    }
  };

  const atualizarCadastro = async () => {
    try {
      if (!selectedAluno) {
        Alert.alert('Selecione um usuário para atualizar o cadastro.');
        return;
      }  
      await updateDoc(doc(db, 'users', selectedUsuario), { turma: selectedTurma });
  
      Alert.alert('Cadastro do aluno atualizado com sucesso!');
      // Limpar campos ou realizar outras ações necessárias após a atualização.
  
    } catch (error) {
      Alert.alert('Erro ao atualizar cadastro do aluno:', error.message);
    }
  };

  const handleAlunosSelection = (selectedAluno) => {
    setSelectedAluno(selectedAluno);
  };
  const handleTurmasSelection = (selectedTurma) => {
    setSelectedTurma(selectedTurma);
  };

  return (
    <ScrollView>
      <View style={styles.tela}>
      <View>
      <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        <Text style={{...styles.title}}>Criar Empresa</Text>
        <TextInput
          placeholder="Nome da Empresa"
          value={nomeEmpresa}
          onChangeText={setNomeEmpresa}
        />
        <TextInput
          placeholder="Email da Empresa"
          value={emailEmpresa}
          onChangeText={setEmailEmpresa}
        />
        <Button title="Criar Empresa" onPress={criarEmpresa} />
      </View>

      <View>
        <Text style={{...styles.title}}>Cadastro de Turma</Text>
        <TextInput
          placeholder="Nome da Turma (Adicione um número)"
          value={nomeTurma}
          onChangeText={setNomeTurma}
        />
        <Button title="Cadastrar Turma" onPress={criarTurma} />
      </View>


      <View>
        <Text style={{...styles.title}}>Usuários</Text>
        {usuarios.map(usuario => (
          <View key={usuario.id}>
            <Text>{usuario.nome}</Text>
            <Text>Nome: {usuario.displayName}</Text>
            <Text>Turma: {usuario.turma || 'Sem Turma'}</Text>
            <Text>-----------------------------------------------------------</Text>
          </View>
        ))}
      </View>

      <View>
        <Text style={{...styles.title}}>Adicionar turma à usuário</Text>
        <View style={{...styles.selecoesNotas}}>
            <Text style={styles.selecao}>Nome   </Text>
            <MultipleSelectList 
            setSelected={handleAlunosSelection} 
            data={alunos} 
            save="value"
          />
        </View>

        <View style={{...styles.selecoesNotas}}>
            <Text style={styles.selecao}>Turma   </Text>
            <MultipleSelectList 
            setSelected={handleTurmasSelection} 
            data={turmas} 
            save="value"
          />
        </View>

        <View>
          <Button title="Atualizar" onPress={atualizarCadastro} />
        </View>

      </View>
      </View>
    </ScrollView>
  );
};

export default CadastroScreen;

const styles = StyleSheet.create({ 
  tela: {
    backgroundColor: '#ecfddc',
    padding: 20,
    flex: 1,
  },
  image: {
    height: 107,
    margin: 32,
    width: 179,
    alignSelf: 'center'
  },
  title: {
    color: '#000000',
    fontSize: 23,
    fontWeight: '700',
    marginTop: 20
  },
  selecoesNotas: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'left',
    width: 355
  },
  selecao: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

})