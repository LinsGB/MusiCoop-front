import {StyleSheet} from 'react-native';
import {isIphone8PlusOrLower} from '../helpers/iphone';

const styles = StyleSheet.create({
  navigationTabs: {
    height: 80,
    borderTopColor: '#484B72',
    borderTopWidth: 2,
    marginBottom: -10,
  },
  loginButton: {
    backgroundColor: '#226ddcff',
    borderRadius: 20,
  },
});

export default styles;
