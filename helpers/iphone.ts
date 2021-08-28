import {Dimensions, Platform} from 'react-native';

const dimension = Dimensions.get('window');

export function isIPhoneXSize() {
  return dimension.height === 812 && dimension.width === 375;
}

export function isIPhoneXrSize() {
  return dimension.height === 896 && dimension.width === 414;
}
export function isIPhone12() {
  return (
    Platform.OS === 'ios' && dimension.height === 844 && dimension.width === 390
  );
}

export function isIPhone12ProMax() {
  return (
    Platform.OS === 'ios' && dimension.height === 926 && dimension.width === 428
  );
}

export function isIphoneX() {
  return Platform.OS === 'ios' && (isIPhoneXSize() || isIPhoneXrSize());
}

export function isIphone8PlusOrLower() {
  return (
    Platform.OS === 'ios' && dimension.height <= 736 && dimension.width <= 414
  );
}
