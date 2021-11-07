import React, {useEffect, useState} from 'react';
import {Text, View} from '../../../components/Themed';

import {Picker} from '@react-native-picker/picker';

import styles from './styles';
import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import AudioPlayer from '../../../components/audioPlayer';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import * as DocumentPicker from 'expo-document-picker';
import * as uploadFile from '../../../services/post';
import {listPosts} from '../../../services/post';
import reactotron from '../../../config/Reactotron.config';
import {isLoading} from 'expo-font';

const postScreen = () => {
  const [uri, setUri] = useState();
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState<any>();
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [useOpacity, setUseOpacity] = useState<any>(0.4);
  const [modalVisible, setModalVisible] = useState<any>(false);

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

  const maxLengthTitle = 30;

  const charRemainingTitle: string = `${
    title ? Math.abs(title.length - maxLengthTitle) : maxLengthTitle
  } caracteres restantes`;

  const post = async () => {
    setLoading(true);
    const type = 'audio/mpeg';
    const file = {
      uri: uri,
      name: fileName,
      type,
    };
    await textInput.clear();
    if (!title) {
      alert('Por favor, preencha o titulo da postagem');
    }
    if (!description) {
      alert('Por favor, preencha a descrição da postagem');
    }
    if (!fileName) {
      alert('Por favor, insira um arquivo de áudio');
    } else if (!`${fileName}`.match(/mp3|opus|ogg$/)) {
      alert('Por favor, insira um arquivo de áudio válido');
    } else {
      await uploadFile.createPost({file, description, post_name: title});
      setLoading(false);

      listPosts().then((posts) => {
        if (Array.isArray(posts)) {
          setPosts(posts);
        }
        reactotron.debug(posts);
      });
      setLoading(false);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Publicação realizada!</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
      <ScrollView>
        <View style={[{marginLeft: 20}]}>
          <View>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: 8,
                  fontSize: 24,
                }}>
                Título
              </Text>
              <TextInput
                multiline={true}
                maxLength={maxLengthTitle}
                style={{
                  color: 'white',
                  fontSize: 20,
                  paddingRight: 20,
                  marginBottom: 8,
                }}
                placeholder="Insira um titulo"
                placeholderTextColor={'#484B72'}
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
              <View>
                <Text>{charRemainingTitle}</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: 8,
                  fontSize: 24,
                }}>
                Descrição
              </Text>
              <TextInput
                multiline={true}
                style={{color: 'white', fontSize: 20, paddingRight: 20}}
                placeholder="Insira uma descrição"
                placeholderTextColor={'#484B72'}
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
          lightColor="#25214D"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.container}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={pickDocument}
              style={{
                backgroundColor: '#36375F',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
                height: 50,
                justifyContent: 'center',
                width: hasFile ? 250 : 300,
              }}>
              {hasFile ? <Text>{fileName}</Text> : <Text>Enviar arquivo</Text>}
            </TouchableOpacity>
            {hasFile && <AudioPlayer uri={uri} />}
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 190}}>
          <TouchableOpacity
            style={{
              backgroundColor:
                fileName && title && description ? '#F05922' : '#623240',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              borderRadius: 100,
              padding: 10,
              width: 300,
              // opacity: fileName && title && description ? 1 : 0.4,
            }}
            disabled={!(fileName && title && description)}
            onPress={() => post()}>
            {!loading ? (
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Postar</Text>
            ) : (
              <ActivityIndicator
                style={{width: 12, height: 20}}
                color="#c8c8c8"
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default postScreen;
