// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {useState, useEffect, useCallback} from 'react';
import logoUsuario from '../../assets/images/fffa.png';

// import all the components we are going to use
import {Text, StyleSheet, View, TextInput, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import api from '../../config/axios/AudioAxios';
import useComments from '../../hooks/useComments';
import AudioPlayer from '../audioPlayer';
import {listPosts} from '../../services/post';
import TouchableButton from '../touchableButton';
import {useNavigation} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';

const Comments = () => {
  const [comments, setComments] = useState();
  const navigation = useNavigation();

  const [audio, setAudio] = useState();

  const {items, post, setPost, setItem, setToggle} = useComments();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    listPosts().then((posts) => {
      if (Array.isArray(posts)) {
        setPosts(posts);
      }
    });
  }, []);

  const handleToggle = (commentIndex: number) => {
    setToggle(commentIndex);
  };
  return (
    <React.Fragment>
      <View
        style={{
          flex: 1,
          margin: 10,
        }}>
        {posts.map((item: any, commentIndex) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                //@ts-ignore
                navigation.navigate('Postagem', {item: item})
              }>
              <View
                key={commentIndex.toString()}
                style={{
                  marginVertical: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 4,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.16,
                  shadowRadius: 4,
                  elevation: 4,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
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
                    <Text>Nome do usuario</Text>
                  </View>
                </View>
                <View>
                  <View style={{marginTop: 20, flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 20,
                        maxWidth: 270,
                        lineHeight: 25,
                        marginBottom: 20,
                      }}>
                      {item.project_name}
                    </Text>
                    {/* <AudioPlayer id={item.id} /> */}
                  </View>
                  {item.toggle && (
                    <React.Fragment>
                      <View
                        style={{
                          marginVertical: 10,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: '#C8C8C8',
                          paddingVertical: 10,
                        }}>
                        <Text style={{fontSize: 13}}>{item.postDate}</Text>
                        <Text style={{marginTop: 10}}>{item.comment}</Text>
                      </View>
                      <View>
                        <TextInput
                          style={{
                            height: 40,
                            borderWidth: 1,
                            paddingLeft: 10,
                            borderColor: '#C8C8C8',
                            backgroundColor: '#FFFFFF',
                            marginBottom: 10,
                          }}
                          underlineColorAndroid="transparent"
                          placeholder="Faça uma colaboração"></TextInput>
                      </View>
                    </React.Fragment>
                  )}
                </View>
                <TouchableWithoutFeedback
                  onPress={() => handleToggle(commentIndex)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="comment-text-outline"
                      size={24}
                      color="black"
                      style={{marginRight: 8}}
                    />
                    <Text>1000 Contribuições</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#C8C8C8',
    backgroundColor: '#FFFFFF',
  },
});

export default Comments;
