import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';

export interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

const TouchableButton = ({disabled, title, onPress, style}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          {
            opacity: disabled ? 0.4 : 1,
          },
          style,
        ]}>
        <Text style={styles.textButton}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TouchableButton;
