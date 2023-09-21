import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView} from 'react-native'
import React from 'react'

import { MultipleSelectList } from 'react-native-dropdown-select-list'

const AvaliacoesItemm = () => {

  const [selected, setSelected] = React.useState([]);

  const turma = [
    {key:'1', value:'Turma 1'},
    {key:'2', value:'Turma 2'},
    {key:'3', value:'Turma 3'},
  ]

  const nome = [
    {key:'1', value:'João'},
    {key:'2', value:'Bruna'},
    {key:'3', value:'Maria'},
  ]

  const dataAvaliacao = [
    {key:'1', value:'10/08/2023'},
    {key:'2', value:'10/09/2023'},
    {key:'3', value:'10/10/2023'},
    {key:'3', value:'10/11/2023'},
  ]

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
    Alert.alert("Enviado!")
  };


  return (
    <View style={styles.tela}>
      <Text style={styles.title}>Avaliações</Text>
        {/* <Image
          style={styles.image}
          source={require('../images/logo.png')}
        /> */}
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Turma   </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={turma} 
            save="value"
            onSelect={() => alert(selected)} 
            // label="Turma"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Nome   </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={nome} 
            save="value"
            onSelect={() => alert(selected)} 
            // label="Nome"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Data da Avaliação   </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={dataAvaliacao} 
            save="value"
            onSelect={() => alert(selected)} 
            // label="Data da Avaliação"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Cumprimento de Metas   </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={metas} 
            save="value"
            onSelect={() => alert(selected)} 
            // label="Cumprimento de Metas"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Habilidade Técnica   </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={habilidade} 
            save="value"
            onSelect={() => alert(selected)} 
            // label="Habilidade Técnica"
          />
        </View>
        <View style={{...styles.selecoesNotas, top: 120}}>
            <Text style={styles.selecao}>Relacionamento Interpessoal   </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={relacionamento} 
            save="value"
            onSelect={() => alert(selected)} 
            // label="Relacionamento Interpessoal"
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
    </View>
    
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
    position: 'absolute',
    top: 32,
    width: 179,
  },
  title: {
    color: '#000000',
    //fontFamily: 'Roboto-Bold',
    fontSize: 23,
    fontWeight: '700',
    left: 21,
    position: 'absolute',
    textAlign: 'left',
    top: 32,
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