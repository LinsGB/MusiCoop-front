import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import logoUsuario from '../../assets/images/user-model.png';
import {AsyncStorage, Image} from 'react-native';
import {apiUser} from '../../services/user';
import jwt_decode from 'jwt-decode';

import styles from './style';
import {CommonActions} from '@react-navigation/native';

const TabTwoScreen = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    AsyncStorage.removeItem('token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  const getUser = async () => {
    const userToken: string = await AsyncStorage.getItem('token');
    const jwt: any = jwt_decode(userToken);
    const userId: number = jwt.id;
    await apiUser
      .getUserById(userId)
      .then((response) => {
        const user: any = response.data;
        setName(user.name);
        setEmail(user.email);
      })
      .catch(() => {
        alert(
          'Não foi possivel pegar as informaçoes do usuário, tente novamente!',
        );
      });
  };
  return (
    <ScrollView style={{backgroundColor: '#25214D'}}>
      <View style={styles.container}>
        <View style={styles.logoView}>
          <TouchableOpacity
            onPress={() => alert('Funcionalidade não implementada')}>
            <Image
              source={logoUsuario}
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                marginTop: 40,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
        <View>
          <View style={styles.userView}>
            <Text style={styles.user}>nome do usuário:</Text>
            <Text style={styles.userText}>{name}</Text>
          </View>
          <View style={styles.emailView}>
            <Text style={styles.email}>e-mail:</Text>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          <View style={styles.logoutView}>
            <TouchableOpacity
              style={styles.seeContriButton}
              onPress={() =>
                //@ts-ignore
                navigation.navigate('Contribution')
              }>
              <Text style={styles.passwordText}>Ver Contribuições</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.seePostsButton}
              onPress={() =>
                //@ts-ignore
                navigation.navigate('Posts')
              }>
              <Text style={styles.passwordText}>Ver Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => logout()}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TabTwoScreen;
