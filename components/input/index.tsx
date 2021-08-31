import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

export interface Props {
  title: string;
  onChangeText: () => void;
  disabled?: boolean;
  style?: any;
}

const UselessTextInput = ({disabled, title, onChangeText, style}: Props) => {
  return (
    <SafeAreaView>
      <TextInput style={styles.input} onChangeText={onChangeText} />
      <View>
        <TextInput
          style={styles.input}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UselessTextInput;
