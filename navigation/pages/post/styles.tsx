import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#25214D',
    justifyContent: 'center',
  },
  picker: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#666',
    width: 300,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    alignItems: 'center',
  },
  file: {
    color: 'black',
    marginVertical: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
