import React, {useState} from 'react';
import {Text, View} from '../../../components/Themed';

import {Picker} from '@react-native-picker/picker';

import styles from './styles';
import {Button, Pressable, TextInput} from 'react-native';
import AudioPlayer from '../../../components/audioPlayer';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import * as DocumentPicker from 'expo-document-picker';
import * as uploadFile from '../../../services/post';

const postScreen = () => {
  const [uri, setUri] = useState();
  const [fileName, setFileName] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false,
    });
    //@ts-ignore
    setFileName(result.name);
    //@ts-ignore
    setUri(result.uri);
  };

  const post = async () => {
    console.log(description, title);
    const type = 'audio/mpeg';
    const file = {
      uri: uri,
      name: fileName,
      type,
    };
    await uploadFile.createPost({file, description, post_name: title});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[{marginLeft: 20}]}>
          <View>
            <View style={{marginBottom: 20}}>
              <Text>Titulo</Text>
              <TextInput
                style={{fontWeight: 'bold'}}
                placeholder="Insira um titulo bacana pro seu post"
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View>
              <Text>Descrição</Text>
              <TextInput
                style={{fontWeight: 'bold'}}
                placeholder="Insira uma descrição bacana pro seu post"
                onChangeText={(text) => setDescription(text)}
              />
            </View>
          </View>
        </View>
        <View
          style={styles.separator}
          lightColor="#C8C8C8"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.container}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={pickDocument}
              style={{
                backgroundColor: '#eee',
                paddingHorizontal: 40,
                paddingVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
                height: 50,
                justifyContent: 'center',
              }}>
              <Text>Enviar arquivo</Text>
            </TouchableOpacity>
            <AudioPlayer uri={uri} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: '#eee',
          alignItems: 'center',
          marginHorizontal: 40,
          marginBottom: 20,
          borderRadius: 100,
          padding: 10,
        }}
        onPress={() => post()}>
        <Text style={{color: '#2f95dc', fontWeight: 'bold'}}>Postar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default postScreen;
