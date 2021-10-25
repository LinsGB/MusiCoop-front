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
<<<<<<< HEAD
import { createPost } from '../../services/post'
import { StorageAccessFramework } from 'expo-file-system';
=======
import { Buffer } from "buffer";
>>>>>>> 21c6542eef8894af16d034217f214af2a8d7033b

const UploadFile = () => {
  const [uri, setUri] = useState();

  const pickDocument = async () => {
<<<<<<< HEAD
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

=======
    const result = await DocumentPicker.getDocumentAsync({type:'*/*',
                                                          copyToCacheDirectory: false,});
    //@ts-ignore
    let localUri = result.uri;
    //@ts-ignore
    let filename = result.name;
    let type = 'audio/mpeg';
    //@ts-ignore
    setUri(result.uri + "/" + result.name)
    var fileToUpload = {
      uri: localUri,
      name: filename, type,
    };
    await uploadFile.createPost(fileToUpload)
>>>>>>> 21c6542eef8894af16d034217f214af2a8d7033b
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
