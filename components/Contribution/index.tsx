import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Text, View} from '../../components/Themed';
import logoUsuario from '../../assets/images/avatar_Prancheta.png';
import * as DocumentPicker from 'expo-document-picker';
import clipe from '../../assets/images/clipe.png';
import postar from '../../assets/images/postar.png';
import postarOpacity from '../../assets/images/postarOpaco.png';

import AudioPlayer from '../../components/audioPlayer';
import {
  createContribuition,
  findPost,
  listContributionByUser,
} from '../../services/post';
import {Reload} from '../../context/reload';
import {apiUser} from '../../services/user';
import {useNavigation} from '@react-navigation/native';

const ModalScreenPost = () => {
  const [comment, setComment] = useState('');
  const [contribuitions, setContribuitions] = useState([]);
  const [uri, setUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [hasFile, setHasFile] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [postSelected, setPostSelected] = useState<any>(false);

  const navigation = useNavigation();
  useEffect(() => {
    //onRefresh();
    contributionProccess();
    if (fileName) {
      setHasFile(true);
    }
    if (!fileName) {
      setHasFile(false);
    }
  }, [fileName, hasFile]);

  const contributionProccess = async () => {
    setContribuitions(await listContributionByUser());
  };

  const onRefresh = React.useCallback(() => {
    /*findPost(route.params.item.id).then(async (posts) => {
      //@ts-ignore
      if (Array.isArray(posts.contribuitions)) {
        //@ts-ignore
        const userPost = await getUserById(posts.user)
        //@ts-ignore
        setUsername(userPost.username)
      }
    });
    const wait = (timeout: any) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));*/
    console.log('TEST');
  }, []);

  //const items = route.params.item;

  const [context, setContext] = useState();
  return (
    <Reload.Provider value={[context, setContext]}>
      <React.Fragment>
        <View>
          <ScrollView
            style={{backgroundColor: '#25214D'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }></ScrollView>
        </View>
        <View style={{paddingBottom: 5}}>
          {hasFile && (
            <View
              style={{flexDirection: 'row', paddingTop: 10, paddingLeft: 20}}>
              <Text style={{marginLeft: 10}}>{fileName}</Text>
            </View>
          )}
          <ScrollView style={{marginTop: 20}}>
            {contribuitions.map((contribuition: any) => (
              <TouchableOpacity
                onPress={async () =>
                  //@ts-ignore
                  navigation.navigate('Postagem', {
                    item: await findPost(contribuition.post),
                  })
                }>
                <View
                  style={{
                    marginBottom: 10,
                    flex: 1,
                    borderRadius: 8,
                    backgroundColor: '#36375f',
                    marginHorizontal: 10,
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

                      <Text style={{color: 'white'}}>
                        {contribuition.username}
                      </Text>
                    </View>
                    {contribuition.file_size > 0 && (
                      <AudioPlayer
                        uri={
                          contribuition.uri ||
                          `https://musicoop-api.herokuapp.com/musics?contribuition_id=${contribuition.id}`
                        }
                      />
                    )}
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
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    paddingTop: 5,
    color: 'white',
  },
  helpContainer: {},
  helpLink: {},
  helpLinkText: {},
});
