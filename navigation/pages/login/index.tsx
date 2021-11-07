import React from 'react';
import {Image, View} from 'react-native';
import TouchableButton from '../../../components/touchableButton';
import Logo from '../../../assets/images/musicoop.png';

import styles from './styles';

const loginScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 200}}>
        <Image style={{width: 150, height: 153.75}} source={Logo} />
      </View>
      <View style={{marginVertical: 20}}>
        <TouchableButton
          onPress={() => navigation.navigate('Root')}
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
