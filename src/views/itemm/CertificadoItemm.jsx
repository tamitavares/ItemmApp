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
  const [usuarios, setUsuarios] = useState([]);

  const uploadToFirebase = async () => {
    if (pickedDocument) {
      try {

        if (!selectedAluno) {
          Alert.alert('Selecione um usuário para envio.');
          return;
        }
        if (!setPickedDocument) {
          Alert.alert('Selecione um Documento para envio.');
          return;
        }   
        
        const p = query(collection(db, 'users'), where("displayName", "==", selectedAluno));
        const querySnapshot = await getDocs(p);
        
        console.log('verificado 1')
        /*const fileData = { nome: pickedDocument.assets[0].nam, uri: pickedDocument.assets[0].uri };
        await addDoc(collection(db, 'users',documento.id,'certificado'), fileData);*/
        querySnapshot.docs((documento) => {
          console.log('verificado 2')
          const docRef = doc(db, 'users', documento.id,'certificado');
          addDoc(docRef, fileData);

          console.log('verificado 3')
        });

        /*  setPickedDocument('');  */      

        Alert.alert('Upload concluído com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar para o Firebase:', error);
      }
    } else {
      Alert.alert('Nenhum documento selecionado para enviar.');
    }
  };


  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Você pode definir os tipos de arquivo permitidos
      });
      console.log(result)
      if (result.assets[0].mimeType === 'application/pdf') {
        setPickedDocument(result);
        /*console.log('foi!!!!!!!!!!!!!!!!!!!!!!!!!!!')*/
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
    async function listarUsuarios() {
      try {
        const usuariosSnapshot = await getDocs(collection(db, 'users'));
        const usuariosData = usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
      }
    }
    if (pickedDocument) {
      /*console.log('Documentos escolhidos:', pickedDocument);*/

      // Acesse o array 'assets' para obter detalhes sobre os arquivos
      const type = pickedDocument.assets[0].mimeType;
      const name = pickedDocument.assets[0].name;
      if (type && name) {
        console.log(type)
        console.log(name)
        return;
      }
    }

    listarUsuarios() 
    getAlunos();

  }, [])

  const handleAlunosSelection = (selectedAluno) => {
    setSelectedAluno(selectedAluno);
  };

  

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
          <Text>Uri: {pickedDocument.assets[0].uri} </Text>
        </View>
      )}
    
    <Button title = "Enviar certificado" onPress={uploadToFirebase}/>


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





/*querySnapshot.forEach((documento) => {
          const docRef = doc(db, 'users', documento.id,'certificado', 'vUSolFeRmuzsFykthdUo');
          updateDoc(docRef, { "uri": pickedDocument.assets[0].uri });
          updateDoc(docRef, { "nome": pickedDocument.assets[0].name });
        }); */