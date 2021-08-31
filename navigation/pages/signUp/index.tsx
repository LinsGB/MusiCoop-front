import React from 'react';
import {TextInput, View, Text} from 'react-native';
import TouchableButton from '../../../components/touchableButton';

import styles from './styles';

const SingUp = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Nome</Text>
        <TextInput style={styles.input} placeholder="Insira seu nome" />
      </View>
      <View style={{marginTop: 20}}>
        <TouchableButton
          onPress={() => navigation.navigate('Root')}
          title="registrar"
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

export default SingUp;
