import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import TouchableButton from '../../../components/touchableButton';

import styles from './styles';

const authScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();

  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: 'white'}}>Email</Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 20,
            marginBottom: 20,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#4e4a6e',
          }}
          placeholder="Insira seu email"
          placeholderTextColor={'#484B72'}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text style={{color: 'white'}}>Senha</Text>

        <TextInput
          style={{
            color: 'white',
            fontSize: 20,
            marginBottom: 40,
            paddingBottom: 3,
            borderBottomWidth: 1,
            borderBottomColor: '#4e4a6e',
          }}
          secureTextEntry
          placeholder="Insira sua senha"
          placeholderTextColor={'#484B72'}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{marginTop: 20}}>
        <TouchableButton
          disabled={!(email && password)}
          onPress={() => navigation.navigate('Root')}
          title="entrar"
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

export default authScreen;
