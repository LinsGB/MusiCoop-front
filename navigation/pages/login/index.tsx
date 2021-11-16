import React from 'react';
import {Image, View} from 'react-native';
import TouchableButton from '../../../components/touchableButton';
import Logo from '../../../assets/images/musicoop.png';
import {apiUser} from '../../../services/user';

import styles from './styles';
import Metrics from '../../../helpers/Metrics';
import {AsyncStorage} from 'react-native';

const loginScreen = ({navigation}: {navigation: any}) => {
  const verifyHeight = () => {
    if (Metrics.constants.screenHeight >= 760) {
      return 200;
    }
    return 90;
  };

  const isLogged = async () => {
    const token = AsyncStorage.getItem('token');
    await apiUser.getToken(await token).then((response: any) => {
      if(response.status == 200){
        navigation.navigate('Root')
      }
    }).catch((response:any) => {
        navigation.navigate('Auth')
    })
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: verifyHeight()}}>
        <Image style={{width: 150, height: 153.75}} source={Logo} />
      </View>
      <View style={{marginVertical: 20}}>
        <TouchableButton
          onPress={() => isLogged()}
          title="Entrar"
          style={[styles.loginButton, {backgroundColor: '#CB3C94'}]}
        />
      </View>
      <View>
        <TouchableButton
          onPress={() => navigation.navigate('SignUp')}
          title="inscreva-se"
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

export default loginScreen;
