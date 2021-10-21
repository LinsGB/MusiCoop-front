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
import AudioPlayer from '../audioPlayer';

const UploadFile = () => {
  const [uri, setUri] = useState()
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    //@ts-ignore
    setUri(result.uri)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.file}>Envie sua música</Text>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button title="selecionar" color="black" onPress={pickDocument} />
        </TouchableOpacity>
        <AudioPlayer uri={uri} />
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
