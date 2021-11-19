import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../components/Themed';
import Colors from '../constants/Colors';
import {AsyncStorage} from 'react-native';

const ModalScreenUser = ({navigation}: {navigation: any}) => {
  const logout = async () => {
    const token = AsyncStorage.getItem('token');
    console.log(await token)
    AsyncStorage.removeItem('token');
    const token2 = AsyncStorage.getItem('token');
    console.log(await token2)
    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <View style={styles.getStartedContainer}>
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            Nome
          </Text>
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            data de criação
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity
            onPress={() => logout()}
            style={styles.helpLink}>
            <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};
export default ModalScreenUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
