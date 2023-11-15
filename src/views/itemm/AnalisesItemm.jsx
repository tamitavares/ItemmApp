import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { db } from '../../../firebaseConfig'
import { getDocs, query, collection } from 'firebase/firestore'
import { ProgressChart } from 'react-native-chart-kit'

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const AnalisesItemm = () => {

  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [graph, setGraph] = useState(false);
  const [habilidade, setHabilidade] = useState('');
  const [metas, setMetas] = useState('');
  const [relacionamento, setRelacionamento] = useState('');

  const buildGraph = (values) => {
    console.log('Construindo gráfico com os valores: ' + values)
    setGraph(
      <ProgressChart
            data={
              {labels: ['Habilidades Interpessoais', 'Relacionamento', 'Metas'],
              data: values}}
            width={350}
            height={300}
            strokeWidth={10}
            radius={40}
            chartConfig={chartConfig}
            hideLegend={true}
            style={{alignContent: 'center'}}
      />
    )
  }

  useEffect(() => {

    setGraph([0, 0, 0]);


    const fetchData = async () => {
      try {
        const collectionData = query(collection(db, 'avaliacoes'));

        const snapshot = await getDocs(collectionData);

        const dados = []

        snapshot.forEach((doc) => {

          dados.push({
            key: String(doc.id),
            value: doc.data().nome[0], 
            habilidade: doc.data().habilidade[0],
            metas: doc.data().metas[0],
            relacionamento: doc.data().relacionamento[0]
          })

        })
      
        setUserData(dados);

      } catch (e){
        console.log(e)
        alert('Erro ao buscar dados do banco de dados');
        console.log('Erro ao buscar dados do banco de dados firebase');
      }
    }

    fetchData();
  }, [])

  useEffect(() => {

    console.log(selectedUser)


    tfullSelectedUser = null;
    new_habilidade = 0;
    new_relacionamento = 0;
    new_metas = 0;

    userData.forEach((userd) => {
      if (userd.key == selectedUser) {
        console.log(userd)
        tfullSelectedUser = userd
        new_habilidade = parseInt(userd.habilidade) / 2;
        new_metas = parseInt(userd.metas) / 2;
        new_relacionamento = parseInt(userd.relacionamento) / 2;
      }
    })

    console.log(new_habilidade);

    buildGraph([new_habilidade, new_relacionamento, new_metas]);

    console.log('Gráfico reconstruido!')

    switch(new_habilidade) {
      case 1: {
        setHabilidade('Excelente! (2/2)');
        break
      }

      case 0.5: {
        setHabilidade('Satisfatório. (1/2)');
        break
      }

      case 0: {
        setHabilidade('Insatisfatório. (0/2)');
        break
      }

      default: {
        setHabilidade('');
        break
      }
    }

    switch(new_metas) {
      case 1: {
        setMetas('Excelente! (2/2)');
        break
      }

      case 0.5: {
        setMetas('Satisfatório. (1/2)');
        break
      }

      case 0: {
        setMetas('Insatisfatório. (0/2)');
        break
      }

      default: {
        setMetas('');
        break
      }
    }

    switch(new_relacionamento) {
      case 1: {
        setRelacionamento('Excelente! (2/2)');
        break
      }

      case 0.5: {
        setRelacionamento('Satisfatório. (1/2)');
        break
      }

      case 0: {
        setRelacionamento('Insatisfatório. (0/2)');
        break
      }

      default: {
        setRelacionamento('');
        break
      }
    }

  }, [selectedUser])

  return (
    <View style={styles.tela}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
        <View style={{position: 'relative', top: 200, flex: 1}}>
          <SelectList 
            setSelected={setSelectedUser}
            data={userData}
            save='key'
            style={{position: 'relative', top: 150}}
            placeholder='Selecione um Aluno'
          
          />
          {graph? graph: <View />}
          <View style={{alignContent: 'center', position: 'relative', flex: 1}}>
            <Text >DE DENTRO PARA FORA:</Text>
            <Text>Habilidades Interpessoais: {habilidade}</Text>
            <Text>Relacionamentos: {relacionamento}</Text>
            <Text>Cumprimento de Metas: {metas}</Text>
          </View>
        </View>

    </View>
  )
}

export default AnalisesItemm

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
})