import * as React from 'react';
import {TouchableOpacity} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import Colors from '../../constants/Colors';
import logoUsuario from '../../assets/images/user-model.png';
import {AsyncStorage, Image} from 'react-native';

import styles from './style';
import {CommonActions} from '@react-navigation/native';

const TabTwoScreen = ({navigation}: {navigation: any}) => {
  const logout = async () => {
    AsyncStorage.removeItem('token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image
          source={logoUsuario}
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            marginTop: 40,
          }}
        />
      </View>
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
      <View>
        <View style={styles.userView}>
          <Text style={styles.user}>nome do usuário</Text>
          <Text style={styles.userText}>Usuário da Silva</Text>
        </View>
        <View style={styles.emailView}>
          <Text style={styles.email}>e-mail</Text>
          <Text style={styles.emailText}>exemplo@teste.com.br</Text>
        </View>
        <View style={styles.logoutView}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => logout()}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TabTwoScreen;
