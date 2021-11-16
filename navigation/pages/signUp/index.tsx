import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView} from 'react-native';
import TouchableButton from '../../../components/touchableButton';
import {apiUser} from '../../../services/user';
import reactotron from '../../../config/Reactotron.config';
import {AsyncStorage} from 'react-native';
import Musicoop from '../../../assets/images/musicooptext.png'

import styles from './styles';

interface Users {
  email:string,
  username:string,
  name:string,
  password:string
}

const SignUp = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState<any>();
  const [username, setUsername] = useState<any>();
  const [name, setName] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const register = async () => {
    setLoading(true)
    const payload:Users = {
      email: email,
      username: username,
      name: name,
      password: password
    }
    await apiUser.createUser(payload).then((response: any) => {
      if (response.status === 200) {
        alert("Usuário registrado com sucesso")
        setLoading(false)
        navigation.navigate('Auth');
      }
    }).catch((response:any) => {
      if(response.status == 403){
        alert("Email ou Usuário já cadastrado!")
      }else{
        alert("Error ao criar o usuário!")
      }
      setLoading(false)
    });
  };

  const validateEmail = (text:string) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setEmail({ email: text })
      return false;
    }
    else {
      setEmail({ email: text })
      console.log("Email is Correct");
    }
  }

  return (
    <ScrollView style={[styles.container]}>
      <View style={{justifyContent:'center', flex:1}}>
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
            onChangeText={(text) => validateEmail(text)}
            placeholder="Insira seu email"
            placeholderTextColor={'#484B72'}
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
            onChangeText={(text) => setUsername(text)}
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
            onChangeText={(text) => setName(text)}
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
            onPress={() => register()}
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
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Registrar</Text>
            ) : (
              <ActivityIndicator
                style={{width: 12, height: 20}}
                color="#c8c8c8"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
