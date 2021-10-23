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
import * as uploadFile from '../../services/post'
import * as FileSystem from 'expo-file-system';
import AudioPlayer from '../audioPlayer';

const UploadFile = () => {
  const [uri, setUri] = useState();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({type:'*/*',
                                                          copyToCacheDirectory: false,});
    
    //@ts-ignore
    const uri = FileSystem.documentDirectory+result.name;
    await FileSystem.copyAsync({
      //@ts-ignore
       from: result.uri,
       to: uri
    })
    //@ts-ignore
    setUri(uri)
    uploadFile.createPost("TESTE", uri)
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
