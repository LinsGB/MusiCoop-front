import React, {useEffect, useState} from 'react';
import {Text, View} from '../../../components/Themed';
import Metrics from '../../../helpers/Metrics';
import {Picker} from '@react-native-picker/picker';

import styles from './styles';
import {
  ActivityIndicator,
  Image,
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
import {Reload} from '../../../context/reload';
import trash from '../../../assets/images/trash.png';

const postScreen = () => {
  const [uri, setUri] = useState('');
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
      type: 'audio/*',
      copyToCacheDirectory: false,
    });
    //@ts-ignore
    setFileName(result.name);
    //@ts-ignore
    setUri(result.uri);
    //@ts-ignore
  };

  const maxLengthTitle = 50;

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
    if (!title) {
      alert('Por favor, preencha o titulo da postagem');
    }
    if (!description) {
      alert('Por favor, preencha a descrição da postagem');
    }
    if (!fileName) {
      alert('Por favor, insira um arquivo de áudio');
    } else if (!`${fileName}`.match(/mp3|opus|ogg$/)) {
      alert('Por favor, confira se inseriu um arquivo de áudio');
      setLoading(false);
    } else {
      setLoading(true);
      await uploadFile.createPost({file, description, post_name: title});
      setLoading(false);
      setModalVisible(true);
      clean();
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }
  };

  const clean = () => {
    setFileName('');
    setDescription('');
    setUri('');
    setTitle('');
  };

  const cleanFile = () => {
    setFileName('');
  };

  const verifyHeight = () => {
    if (Metrics.constants.screenHeight >= 760) {
      return 80;
    }
    return -40;
  };
  const [context, setContext] = useState();
  return (
    <Reload.Provider value={[context, setContext]}>
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
                    if (text.length > 0) {
                      setUseOpacity(1);
                      setDisabled(false);
                    }
                  }}
                  value={title}
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
                  value={description}
                />
              </View>
            </View>
          </View>
          <View
            style={styles.separator}
            lightColor="#25214D"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View style={styles.button}>
            <TouchableOpacity
              onPress={pickDocument}
              disabled={hasFile}
              style={{
                backgroundColor: '#36375F',
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginBottom: verifyHeight(),
                borderRadius: 10,
                alignItems: 'center',
                height: 50,
                justifyContent: 'center',
                width: hasFile ? 230 : 300,
              }}>
              {hasFile ? (
                <Text style={{fontSize: 13}}>{fileName}</Text>
              ) : (
                <Text>Enviar arquivo</Text>
              )}
            </TouchableOpacity>
            {hasFile && <AudioPlayer WithBackground uri={uri} />}
            {hasFile && (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                  backgroundColor: '#F05922',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  height: 50,
                }}
                onPress={() => cleanFile()}>
                <Image source={trash} />
              </TouchableOpacity>
            )}
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
    </Reload.Provider>
  );
};

export default postScreen;
