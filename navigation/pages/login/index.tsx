import React from 'react';
import {View} from 'react-native';
import TouchableButton from '../../../components/touchableButton';

import styles from './styles';

const loginScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableButton
          onPress={() => navigation.navigate('Root')}
          title="Logar"
          style={styles.loginButton}
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
