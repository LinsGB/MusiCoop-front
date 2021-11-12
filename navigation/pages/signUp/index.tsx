import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import TouchableButton from '../../../components/touchableButton';
import {apiUser} from '../../../services/user';
import reactotron from '../../../config/Reactotron.config';
import {AsyncStorage} from 'react-native';

import styles from './styles';

const SignUp = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();

  const login = async () => {
    await apiUser.logInGetToken(email, password).then((response: any) => {
      if (response.status === 200) {
        AsyncStorage.setItem('token', response.data.access_token);
        navigation.navigate('Root');
      } else if (response.status === 401) {
        console.log('INVALIDOOOOOOO');
      }
    });
    const value = AsyncStorage.getItem('token');
    console.log(await value);
  };

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
        <Text style={{color: 'white'}}>Usuário</Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 20,
            marginBottom: 20,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#4e4a6e',
          }}
          placeholder="Insira seu nome de usuário"
          placeholderTextColor={'#484B72'}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text style={{color: 'white'}}>Nome</Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 20,
            marginBottom: 20,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#4e4a6e',
          }}
          placeholder="Insira seu nome de nome"
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
          onPress={() => login()}
          title="registrar"
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

export default SignUp;
