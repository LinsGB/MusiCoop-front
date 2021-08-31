import {StyleSheet} from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

export const inputHeight = 48;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 17,
    height: inputHeight,
    backgroundColor: 'rgba(220,220,220,0.4)',
    shadowColor: Colors.shadow,
    fontSize: Fonts.size.p,
    fontFamily: Fonts.type.geomanist.book,
    borderBottomWidth: 1,
  },
  label: {
    position: 'absolute',
    fontFamily: Fonts.type.geomanist.book,
    fontSize: Fonts.size.small,
    color: '#b1b1b1',
  },
  invalidField: {
    marginVertical: 10,
    color: Colors.red,
    fontFamily: Fonts.type.geomanist.regular,
    fontSize: Fonts.size.small,
  },
});

export default styles;
