import {StyleSheet} from 'react-native';
import {
  isIphone8PlusOrLower
} from '../helpers/iphone';

const styles = StyleSheet.create({
    navigationTabs: {
        paddingBottom: isIphone8PlusOrLower() ? 10 : 0
    }
  });

export default styles;