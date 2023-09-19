import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'

const PresencaItemm = () => {
  return (
    <View style={styles.tela}>
        <Image
          style={styles.image}
          source={require('../images/logo.png')}
        />
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
})