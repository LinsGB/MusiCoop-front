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
import {createPost} from '../../services/post'
import FileSystem from 'expo-file-system'
import { StorageAccessFramework } from 'expo-file-system';

const UploadFile = () => {
  const [uri, setUri] = useState();
  const [file, setFile] = useState()
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log("RESULT => ", result)
    //@ts-ignore
    setUri(result.uri);
    //@ts-ignore
    setFile(result)
    await setDocument()
  };
  

  const setDocument = async () => {
    try {
      console.log("URI => ", uri)
      console.log("TEST => ", FileSystem.readAsStringAsync('file://'+uri, {encoding: FileSystem.EncodingType.Base64}))  
    } catch (error) {
      console.log("ER => ", error)
    }
    
    await createPost({project_name: 'params', file:{
      "name": "AUD-20200414-WA0008.mp3",
      "size": 4536000,
      "type": "success",
      "uri": "/data/user/0/host.exp.exponent/cache/ExperienceData/%40anonymous%2Fmusicoop-app-expo-64b84db0-930a-41ef-beab-2bd4270c239a/DocumentPicker/cf3bde75-c45e-4504-8311-1c506688c330.mp3",
    } , user: 1})
  }

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
