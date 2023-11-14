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
      
      if (result.type === 'application/pdf') {
        setPickedDocument(result);
        console.log(result)
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
      console.log('Informações do documento escolhido:', pickedDocument);

      // Exemplo de como acessar as propriedades corretas
      const { name, type, size } = pickedDocument;

      // Exibir as informações na tela
      console.log('Nome do arquivo:', name);
      console.log('Tipo do arquivo:', type);
      console.log('Tamanho do arquivo:', size);

      // Você pode usar essas informações em seu componente JSX conforme necessário
    }

    getAlunos();

  }, [pickDocument])


  const handleAlunosSelection = (selectedAluno) => {
    setSelectedAluno(selectedAluno);
  };

  const enviaCertificado = () =>{
    Alert.alert('Certificado enviado.');
    return;
  }
  const getArquivo = () =>{
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

    
    <Button title="Select 📑" onPress={pickDocument} />
    
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