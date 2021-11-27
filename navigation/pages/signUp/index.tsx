import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { apiUser } from '../../../services/user';
import Musicoop from '../../../assets/images/musicooptext.png';

import styles from './styles';

interface Users {
  email: string;
  username: string;
  name: string;
  password: string;
}

const SignUp = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<any>();
  const [username, setUsername] = useState<any>();
  const [name, setName] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [validEmail, setValidEmail] = useState<any>(false);
  const [unlockButton, setUnlockButton] = useState<any>(false);

  useEffect(() => {
    validateInputs()
  }, [validEmail, username, name, password])

  const register = async () => {
    setLoading(true);
    const payload: Users = {
      email: email.email,
      username: username,
      name: name,
      password: password,
    };
    await apiUser
      .createUser(payload)
      .then((response: any) => {
        if (response.status === 200) {
          alert('Usuário registrado com sucesso');
          setLoading(false);
          navigation.navigate('Auth');
        } else {
          if (response.data && response.data.detail)
            alert(response.data.detail);
          else
            alert('Algum dato está incorreto ou mal formatado');
          setLoading(false);
        }
      })
      .catch((response: any) => {
        alert('Erro ao cadastrar, verifique os dados!');
        setLoading(false);
      });
  };

  const validateEmail = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail({ email: text });
      setValidEmail(false)
      return false;
    } else {
      setEmail({ email: text });
      setValidEmail(true)
      return true
    }
  };

  const validateInputs = () => {
    if (validEmail && password && name && username) {
      setUnlockButton(true)
    } else {
      setUnlockButton(false)
    }
  }

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
          style={{ width: 166, height: 23 }}
          source={Musicoop}
        />
      </View>
      <View>
        <Text style={{ color: 'white' }}>Email</Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 20,
            marginBottom: 20,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#4e4a6e',
          }}
          onChangeText={(text) => validateEmail(text)}
          placeholder="Insira seu email"
          placeholderTextColor={'#484B72'}
        />
      </View>
      <View>
        <Text style={{ color: 'white' }}>Usuário</Text>
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
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View>
        <Text style={{ color: 'white' }}>Nome</Text>
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
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View>
        <Text style={{ color: 'white' }}>Senha</Text>

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
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <TouchableOpacity
          disabled={!(unlockButton)}
          onPress={() => register()}
          style={[
            styles.loginButton,
            {
              backgroundColor: unlockButton ? '#F05922' : '#623240',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              borderRadius: 100,
              padding: 10,
              width: 300,
            },
          ]}>
          {!loading ? (
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Registrar</Text>
          ) : (
            <ActivityIndicator
              style={{ width: 12, height: 20 }}
              color="#c8c8c8"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
