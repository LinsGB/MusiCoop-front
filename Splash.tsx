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
import loading from './loading.json';

const size = Dimensions.get('window').width * 0.5;

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
    }, 2000);
  }, []);

  //   const startRepeating = () => {
  //       if (!repeating) {
  //           setRepeating(true)
  //           animation.current?.reset()
  //           animation.current?.play()
  //       }
  //   }

  return (
    <View style={styles.container}>
      <LottieView
        source={loading}
        style={{width: size, height: size}}
        autoPlay
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25214D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
