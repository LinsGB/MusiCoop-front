import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadFile = () => {
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // Object {
    //     "name": "IMG-20210902-WA0005.jpg",
    //     "size": 117439,
    //     "type": "success",
    //     "uri": "/data/user/0/host.exp.exponent/cache/ExperienceData/%40quioto%2Fmusicoop-app-expo/DocumentPicker/e3904a97-781e-4ef4-9907-310616b96289.jpg",
    //   }
    // console.log(result.uri);
    // console.log(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.file}>Envie sua música</Text>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button title="selecionar" color="black" onPress={pickDocument} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  file: {
    color: 'black',
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 60,
  },
});

export default UploadFile;
