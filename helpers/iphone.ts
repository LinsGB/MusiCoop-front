import {Dimensions, Platform} from 'react-native';

const dimension = Dimensions.get('window');

export function isIphone8() {
  return (
    Platform.OS === 'ios' && dimension.height === 667 && dimension.width === 375
  );
}

export function isIphone8Plus() {
  return (
    Platform.OS === 'ios' && dimension.height === 736 && dimension.width === 414
  );
}

export function isIphone8PlusOrLower() {
  return (
    Platform.OS === 'ios' && dimension.height <= 736 && dimension.width <= 414
  );
}

export function isIphoneX() {
  return (
    Platform.OS === 'ios' && dimension.height === 812 && dimension.width === 375
  );
}

export function isIphoneXr() {
  return (
    Platform.OS === 'ios' && dimension.height === 896 && dimension.width === 414
  );
}

export function isIphone11() {
  return (
    Platform.OS === 'ios' && dimension.height === 896 && dimension.width === 414
  );
}

export function isIphone11Pro() {
  return (
    Platform.OS === 'ios' && dimension.height === 812 && dimension.width === 375
  );
}

export function isIphone11ProMax() {
  return (
    Platform.OS === 'ios' && dimension.height === 896 && dimension.width === 414
  );
}

export function isIphone12() {
  return (
    Platform.OS === 'ios' && dimension.height === 844 && dimension.width === 390
  );
}

export function isIphone12Mini() {
  return (
    Platform.OS === 'ios' && dimension.height === 812 && dimension.width === 375
  );
}

export function isIphone12Pro() {
  return (
    Platform.OS === 'ios' && dimension.height === 844 && dimension.width === 390
  );
}

export function isIphone12ProMax() {
  return (
    Platform.OS === 'ios' && dimension.height === 926 && dimension.width === 428
  );
}

export function isIphoneSe() {
  return (
    Platform.OS === 'ios' && dimension.height === 568 && dimension.width === 320
  );
}
