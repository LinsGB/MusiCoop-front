import React, {useEffect, useState} from 'react';
import {Text, View} from '../../../components/Themed';

import {Picker} from '@react-native-picker/picker';

import styles from './styles';
import {Button, Pressable, TextInput} from 'react-native';
import AudioPlayer from '../../../components/audioPlayer';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import * as DocumentPicker from 'expo-document-picker';
import * as uploadFile from '../../../services/post';
import {listPosts} from '../../../services/post';
import reactotron from '../../../config/Reactotron.config';

const postScreen = () => {
  const [uri, setUri] = useState();
  const [fileName, setFileName] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState<any>();
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [useOpacity, setUseOpacity] = useState<any>(0.4);

  useEffect(() => {
    reactotron.debug(fileName);

    if (fileName) {
      setHasFile(true);
    }
    if (!fileName) {
      setHasFile(false);
    }
  }, [fileName, hasFile, disabled, useOpacity]);

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
    const type = 'audio/mpeg';
    const file = {
      uri: uri,
      name: fileName,
      type,
    };
    await textInput.clear();
    if (title.length <= 0) {
      alert('Por favor, preencha o titulo da postagem');
    }
    if (description.length <= 0) {
      alert('Por favor, preencha a descrição da postagem');
    }
    if (!fileName) {
      alert('Por favor, insira um arquivo de áudio');
    }
    await uploadFile.createPost({file, description, post_name: title});
    listPosts().then((posts) => {
      if (Array.isArray(posts)) {
        setPosts(posts);
      }
      reactotron.debug(posts);
    });

    alert('Postagem realizada!');
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
                onChangeText={(text) => {
                  setTitle(text);
                  reactotron.debug(disabled);
                  if (text.length > 0) {
                    setUseOpacity(1);
                    setDisabled(false);
                  }
                }}
                ref={(input) => {
                  setTextInput(input);
                }}
              />
            </View>
            <View>
              <Text>Descrição</Text>
              <TextInput
                style={{fontWeight: 'bold'}}
                placeholder="Insira uma descrição bacana pro seu post"
                onChangeText={(text) => setDescription(text)}
                ref={(input) => {
                  setTextInput(input);
                }}
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
            {hasFile && <AudioPlayer uri={uri} />}
          </View>
        </View>
      </ScrollView>

      <View>
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
    </View>
  );
};

export default postScreen;
