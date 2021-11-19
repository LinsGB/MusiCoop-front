import React, {useState} from 'react';
import {CommonActions} from '@react-navigation/core';
import {Image, View, TouchableOpacity, ActivityIndicator, Text} from 'react-native';
import TouchableButton from '../../../components/touchableButton';
import Logo from '../../../assets/images/musicoop.png';
import {apiUser} from '../../../services/user';


import styles from './styles';
import Metrics from '../../../helpers/Metrics';
import {AsyncStorage} from 'react-native';

const loginScreen = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(false);

  const verifyHeight = () => {
    if (Metrics.constants.screenHeight >= 760) {
      return 200;
    }
    return 90;
  };

  const isLogged = async () => {
    setLoading(true);
    const token = AsyncStorage.getItem('token');
    await apiUser.getToken(await token).then((response: any) => {
      if(response.status == 200){
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Root'}],
          }),
        );
      }
    }).catch((response:any) => {
        setLoading(false);
        navigation.navigate('Auth')
    })
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: verifyHeight()}}>
        <Image style={{width: 150, height: 153.75}} source={Logo} />
      </View>
      <View style={{marginVertical: 20}}>
        <TouchableOpacity
          onPress={() => isLogged()}
          style={[styles.loginButton, {backgroundColor: '#CB3C94'}]}
        >
          {!loading ? (
            <Text style={{color: '#fff'}}>ENTRAR</Text>
          ) : (
            <ActivityIndicator
              style={{width: 12, height: 20}}
              color="#c8c8c8"
            />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableButton
          onPress={() => navigation.navigate('SignUp')}
          title="inscreva-se"
          style={styles.registerButton}
        />
      </View>
    </View>
  );
};

export default loginScreen;