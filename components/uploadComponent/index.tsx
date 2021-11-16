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

import * as uploadFile from '../../services/post';
import * as FileSystem from 'expo-file-system';
import AudioPlayer from '../audioPlayer';
import {Buffer} from 'buffer';

const UploadFile = () => {
  const [uri, setUri] = useState();
  const [fileName, setFileName] = useState<any>();
  const [saveUri, setSaveUri] = useState<any>();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false,
    });
    //@ts-ignore
    setSaveUri(result.uri);
    //@ts-ignore
    setFileName(result.name);
    let type = 'audio/mpeg';
    //@ts-ignore
    setUri(result.uri + '/' + result.name);
    var fileToUpload = {
      uri: saveUri,
      name: fileName,
      type,
    };
    await uploadFile.createPost(fileToUpload);
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
        {!fileName && (
          <TouchableOpacity
            style={{
              backgroundColor: '#eee',
              paddingHorizontal: 40,
              paddingVertical: 5,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Button
              title="Enviar arquivo"
              color="black"
              onPress={() => setFileName('')}
            />
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UploadFile;
