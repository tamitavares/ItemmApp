import { View, Text, StyleSheet, Image, Button, Alert, Platform} from 'react-native'
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './../../../firebaseConfig';
import React, { useEffect,useState } from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { SelectList } from 'react-native-dropdown-select-list'

const CertificadoItemm = () => {

  const [selectedAluno, setSelectedAluno] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [pickedDocument, setPickedDocument] = useState(null);


  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Você pode definir os tipos de arquivo permitidos
      });
      
      if (result.assets[0].mimeType === 'application/pdf') {
        setPickedDocument(result);
        console.log('foi!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      } else {
        setPickedDocument(null);
      }
    } catch (err) {
      console.error('Erro ao escolher o documento:', err);
    }
  };

  useEffect(()=>{
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
    if (pickedDocument) {
      /*console.log('Documentos escolhidos:', pickedDocument);*/

      // Acesse o array 'assets' para obter detalhes sobre os arquivos
      const type = pickedDocument.assets[0].mimeType;
      const name = pickedDocument.assets[0].name;
      if (type) {
        console.log(type)
        console.log(name)
        return;
      }
    }

    getAlunos();

  }, [])

  const atualizarCadastro = async () => {
    try {
      if (!selectedAluno) {
        Alert.alert('Selecione um usuário para atualizar o cadastro.');
        return;
      }  
      
      /* console.log(selectedAluno)
      console.log(selectedTurma) */

      //Alert.alert(selectedAluno)
      //Alert.alert(selectedTurma)
      console.log(selectedAluno.uid);
      await updateDoc(doc(db, 'users', selectedAluno), { "turma": selectedTurma });
  
      Alert.alert('Cadastro do aluno atualizado com sucesso!');
      // Limpar campos ou realizar outras ações necessárias após a atualização.
  
    } catch (error) {
      Alert.alert('Erro ao atualizar cadastro do aluno:', error.message);
    }
  };


  const handleAlunosSelection = (selectedAluno) => {
    setSelectedAluno(selectedAluno);
  };

  const enviaCertificado = () =>{
    Alert.alert('Certificado enviado.');
    return;
  }

  return (
    <View style={styles.tela}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
    <SelectList 
      setSelected={handleAlunosSelection} 
      data={alunos} 
      save="value"
      />

    
    <Button title="Selecione o Documento" onPress={pickDocument} />

    {pickedDocument && (
        <View style={{ marginTop: 20 }}>
          <Text>Nome do arquivo: {pickedDocument.assets[0].name}</Text>
          <Text>Tipo do arquivo: {pickedDocument.assets[0].mimeType}</Text>
          <Text>Tamanho do arquivo: {pickedDocument.assets[0].size} bytes</Text>
        </View>
      )}
    
    <Button title = "Enviar certificado" onPress={enviaCertificado}/>


    </View>
  )
}

export default CertificadoItemm

const styles = StyleSheet.create({
  tela: {
    backgroundColor: '#ecfddc',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 107,
    position: 'absolute',
    top: 32,
    width: 179,
  },
})