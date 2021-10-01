import {StyleSheet} from 'react-native';
import {isIphone8PlusOrLower} from '../helpers/iphone';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  navigationTabs: {
    paddingBottom: isIphone8PlusOrLower() ? 10 : 0,
    borderTopWidth: 0,
    elevation: 0,
  },
  loginButton: {
    backgroundColor: '#226ddcff',
    borderRadius: 20,
  },
});

export default styles;
