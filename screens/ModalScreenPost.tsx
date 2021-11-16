import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Text, View} from '../components/Themed';
import logoUsuario from '../assets/images/fffa.png';
import * as DocumentPicker from 'expo-document-picker';
import clipe from '../assets/images/clipe.png';
import postar from '../assets/images/postar.png';
import postarOpacity from '../assets/images/postarOpaco.png';

import AudioPlayer from '../components/audioPlayer';
import {createContribuition, findPost} from '../services/post';
import {Reload} from '../context/reload';

const ModalScreenPost = ({route}: {route: any}) => {
  const [comment, setComment] = useState('');
  const [contribuitions, setContribuitions] = useState([]);
  const [uri, setUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [hasFile, setHasFile] = useState<any>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRefresh();
    setContribuitions(route.params.item.contribuitions);
    if (fileName) {
      setHasFile(true);
    }
    if (!fileName) {
      setHasFile(false);
    }
  }, [fileName, hasFile]);

  const onRefresh = React.useCallback(() => {
    findPost(route.params.item.id).then((posts) => {
      //@ts-ignore
      if (Array.isArray(posts.contribuitions)) {
        //@ts-ignore
        setContribuitions(posts.contribuitions);
      }
    });
    const wait = (timeout: any) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const items = route.params.item;

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });
      //@ts-ignore
      setFileName(result.name);
      //@ts-ignore
      setUri(result.uri);
    } catch (error) {
      console.log('ERROR => ', error);
    }
  };

  const postContribuition = async () => {
    setLoading(true);
    const copyContribuitions = [...contribuitions];
    copyContribuitions.push({name: comment, uri});
    setContribuitions(copyContribuitions);
    const type = 'audio/mpeg';
    const file = {
      uri: uri,
      name: fileName,
      type,
    };
    //@ts-ignore
    await createContribuition(items.id, {
      name: comment,
      description: comment,
      file,
    });
    setLoading(false);
    setFileName('');
    setComment('');
    setUri('');
  };

  const [context, setContext] = useState();
  return (
    <Reload.Provider value={[context, setContext]}>
      <React.Fragment>
        <View style={styles.container}>
          <ScrollView
            style={{backgroundColor: '#25214D'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View
              style={{
                marginBottom: 10,
                flex: 1,
                borderWidth: 2,
                borderColor: '#4e4a6e',
                borderRadius: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#4e4a6e',
                  marginHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={logoUsuario}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{color: 'white'}}>Nome do usuario</Text>
                </View>
                <AudioPlayer
                  uri={`https://musicoop-api.herokuapp.com/musics?post_id=${items.id}`}
                />
              </View>
              <View style={{marginHorizontal: 10}}>
                <Text style={styles.title}>{items.post_name}</Text>
                <View style={styles.getStartedContainer}>
                  <Text
                    style={styles.getStartedText}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    {items.description}
                  </Text>
                </View>
              </View>
            </View>
            {contribuitions.map((contribuition: any) => (
              <View
                style={{
                  marginBottom: 10,
                  flex: 1,
                  borderRadius: 8,
                  backgroundColor: '#36375f',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: '#4e4a6e',
                    marginHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: '#36375f',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#36375f',
                    }}>
                    <Image
                      source={logoUsuario}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{color: 'white'}}>Nome do usuario</Text>
                  </View>
                  <AudioPlayer
                    uri={
                      contribuition.uri ||
                      `https://musicoop-api.herokuapp.com/musics?contribuition_id=${contribuition.id}`
                    }
                  />
                </View>

                <View style={{marginHorizontal: 10}}>
                  <View style={{backgroundColor: '#36375f'}}>
                    <Text
                      style={styles.getStartedText}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {contribuition.name}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={{borderTopWidth: 1, borderColor: '#eee', paddingBottom: 5}}>
          {hasFile && (
            <View
              style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 20}}>
              <Text style={{marginLeft: 10}}>{fileName}</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 25,
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 10,
                borderRadius: 8,
                paddingVertical: 8,
              }}>
              <TouchableOpacity
                style={{
                  borderRightWidth: 1,
                  paddingVertical: 9,
                  paddingRight: 10,
                  borderRightColor: '#cac8c8',
                }}
                onPress={() => pickDocument()}>
                <Image
                  source={clipe}
                  style={{
                    width: 17,
                    height: 15,
                  }}
                />
              </TouchableOpacity>
              <TextInput
                style={{
                  paddingTop: 0,
                  paddingLeft: 10,
                  width: '80%',
                }}
                multiline
                value={comment}
                onChangeText={(text) => {
                  setComment(text);
                }}
                underlineColorAndroid="transparent"
                placeholder="Faça uma colaboração"></TextInput>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#36375f',
                  paddingVertical: 17,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  marginLeft: 8,
                }}
                onPress={() => postContribuition()}>
                {!loading ? (
                  <Image
                    source={comment ? postar : postarOpacity}
                    style={{
                      width: 17,
                      height: 15,
                    }}
                  />
                ) : (
                  <ActivityIndicator
                    style={{width: 17, height: 16}}
                    color="#c8c8c8"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </React.Fragment>
    </Reload.Provider>
  );
};
export default ModalScreenPost;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    paddingBottom: 0,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  separator: {
    height: 1,
    width: '80%',
  },
  getStartedContainer: {},
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
    color: 'white',
  },
  helpContainer: {},
  helpLink: {},
  helpLinkText: {},
});
