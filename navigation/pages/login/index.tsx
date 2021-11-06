import React from 'react';
import {Image, View} from 'react-native';
import TouchableButton from '../../../components/touchableButton';
import Logo from '../../../assets/images/musicoop.png';

import styles from './styles';

const loginScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 50}}>
        <Image style={{width: 200, height: 205}} source={Logo} />
      </View>
      <View>
        <TouchableButton
          onPress={() => navigation.navigate('Root')}
          title="Logar"
          style={[styles.loginButton, {backgroundColor: '#CB3C94'}]}
        />
      </View>
      <View style={{marginTop: 20}}>
        <TouchableButton
          onPress={() => navigation.navigate('SignUp')}
          title="registrar"
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

export default loginScreen;
