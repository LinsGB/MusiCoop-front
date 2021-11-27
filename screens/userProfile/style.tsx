import {StyleSheet} from 'react-native';
import {isIphone8PlusOrLower} from '../../helpers/iphone';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoView: {
    alignItems: 'center',
    marginBottom: 60,
  },
  userView: {
    marginBottom: 28,
    marginHorizontal: 25,
  },
  user: {
    textTransform: 'uppercase',
    fontSize: 18,
    marginBottom: 5,
  },
  userText: {
    fontSize: 14,
  },
  emailView: {
    marginHorizontal: 25,
    marginBottom: 28,
  },
  email: {
    textTransform: 'uppercase',
    fontSize: 18,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
  },
  logoutView: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#F05922',
    paddingVertical: 5,
    borderRadius: 100,
    width: 200,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
  },
  passwordButton: {
    backgroundColor: '#F05922',
    paddingVertical: 5,
    marginBottom: 100,
    borderRadius: 100,
    width: 200,
    alignItems: 'center',
  },
  passwordText: {
    color: 'white',
  },
});

export default styles;
