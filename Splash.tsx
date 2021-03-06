import {CommonActions, useNavigation} from '@react-navigation/core';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import splashAnimation from './animation.json';
import Constants from 'expo-constants';

const size = Dimensions.get('window').width * 2;
const version = Constants.manifest.version;

const Splash = () => {
  const [repeating, setRepeating] = useState(false);
  const animation = useRef<LottieView>(null);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }, 3000);
  }, []);

  //   const startRepeating = () => {
  //       if (!repeating) {
  //           setRepeating(true)
  //           animation.current?.reset()
  //           animation.current?.play()
  //       }
  //   }

  return (
    <>
      <View style={styles.container}>
        <LottieView
          source={splashAnimation}
          style={{width: size, height: size}}
          autoPlay
          resizeMode="contain"
        />
      </View>
      <Text style={styles.versionText}>{`Versão ${version}`}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25214D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Splash;
