import React, {useState} from 'react';
import {CommonActions} from '@react-navigation/core';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import TouchableButton from '../../../components/touchableButton';
import {apiUser} from '../../../services/user';
import reactotron from '../../../config/Reactotron.config';
import {AsyncStorage} from 'react-native';
import Musicoop from '../../../assets/images/musicooptext.png';

import styles from './styles';

const authScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    await apiUser.logInGetToken(email, password).then((response: any) => {
      if (response.status === 200) {
        AsyncStorage.setItem('token', response.data.access_token);
        setLoading(false);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Root'}],
          }),
        );
      } else if (response.status === 401) {
        setLoading(false);
        alert("Confira seus dados e tente novamente!")
      }
    });
    const value = AsyncStorage.getItem('token');
    console.log(await value);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="stretch"
          style={{width: 166, height: 23}}
          source={Musicoop}
        />
      </View>
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
      <View style={{marginTop: 20, alignItems:'center'}}>
        <TouchableOpacity
          disabled={!(email && password)}
          onPress={() => login()}
          style={[
            styles.loginButton,
            {
              backgroundColor: password && email ? '#F05922' : '#623240',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              borderRadius: 100,
              padding: 10,
              width: 300,
            },
          ]}>
          {!loading ? (
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Entrar</Text>
          ) : (
            <ActivityIndicator
              style={{width: 12, height: 20}}
              color="#c8c8c8"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default authScreen;
