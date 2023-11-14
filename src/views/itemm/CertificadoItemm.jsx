import { View, Text, StyleSheet, Image, Button, Alert, Platform} from 'react-native'
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './../../../firebaseConfig';
import React, { useEffect,useState } from 'react'
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker'
import { SelectList } from 'react-native-dropdown-select-list'

const CertificadoItemm = () => {

  const [selectedAluno, setSelectedAluno] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [fileResponse, setFileResponse] = useState([]);
  

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

    async function pickDocument() {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
    
        // O arquivo selecionado está disponível em 'result.uri'
        console.log(result.uri);
    
        // Se você estiver usando Android, pode precisar ajustar o caminho do arquivo para o formato de URI do Android
        const androidURI = Platform.OS === 'android' ? `file://${result.uri}` : result.uri;
        console.log('Caminho do arquivo no Android:', androidURI);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // Usuário cancelou a seleção
          console.log('Seleção cancelada');
        } else {
          throw err;
        }
      }
    }


    getAlunos();

  }, [])


  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);


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

    <StatusBar barStyle={'dark-content'} />
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
      <Button title="Select 📑" onPress={handleDocumentSelection} />
    
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