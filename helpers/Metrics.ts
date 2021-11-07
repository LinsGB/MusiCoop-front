import {Dimensions} from 'react-native';

const constants = {
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
};

const screen = {
  screenHorizontal: 18,
  screenVerticalTop: 40,
};

export default {constants, screen};
