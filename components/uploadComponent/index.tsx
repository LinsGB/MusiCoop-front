import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as uploadFile from '../../services/post'
import * as FileSystem from 'expo-file-system';
import AudioPlayer from '../audioPlayer';
import { createPost } from '../../services/post'
import { StorageAccessFramework } from 'expo-file-system';

const UploadFile = () => {
  const [uri, setUri] = useState();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });

      //@ts-ignore
      const uri = FileSystem.documentDirectory + result.name;
      await FileSystem.copyAsync({
        //@ts-ignore
        from: result.uri,
        to: uri
      })
      //@ts-ignore
      setUri(uri)
      const x = await FileSystem.readAsStringAsync(uri)
      console.log("BASE64 => ", x)
      uploadFile.createPost("BATATINHA123", x).then(resp => console.log("RESP => ", resp))
    } catch (error) {
      console.log("BATATINHA123 => ", error)
    }

  };


  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity
          style={{
            backgroundColor: '#eee',
            paddingHorizontal: 40,
            paddingVertical: 5,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Button title="Enviar arquivo" color="black" onPress={pickDocument} />
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
    flexDirection: 'row',
  },
});

export default UploadFile;
