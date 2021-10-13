import {react} from '@babel/types';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  TouchableNativeFeedbackBase,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AudioPlayer from '../components/audioPlayer';

const Routes = () => {
  const [posts, setPosts] = useState(['Jp', 'lulu', 'linsguebe']);
  const [comments, setComments] = useState(false);
  useEffect(() => {
    //request de todos os posts
    //set posts
  }, []);
  const handleComments = () => {
    setComments(!comments);
  };
  const FirstRoute = () => {
    return (
      <React.Fragment>
        <ScrollView>
          <View
            style={{
              flex: 1,
              margin: 10,
            }}>
            {posts.map((post) => {
              //const {title, comments, music} = post
              return (
                <View
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
                  <Text>{post}</Text>
                  <View>
                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 20,
                          maxWidth: 270,
                          lineHeight: 25,
                          marginBottom: 20,
                        }}>
                        Titulo do post
                      </Text>
                      <AudioPlayer />
                    </View>
                    {comments && (
                      <React.Fragment>
                        <View
                          style={{
                            marginVertical: 10,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: '#C8C8C8',
                            paddingVertical: 10,
                          }}>
                          <Text style={{fontSize: 13}}>
                            Jp - 20/10/2012 - 10:10
                          </Text>
                          <Text style={{marginTop: 10}}>
                            ComentarioComentarioComentarioComentarioComentarioComentarioComentarioComentarioComentarioComentarioComentarioComentario
                          </Text>
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
                  <TouchableWithoutFeedback onPress={handleComments}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialCommunityIcons
                        name="comment-text-outline"
                        size={24}
                        color="black"
                        style={{marginRight: 8}}
                      />
                      <Text>1000 Comentarios</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </React.Fragment>
    );
  };

  const SecondRoute = () => {
    return (
      <React.Fragment>
        <View style={{flex: 1, margin: 10}}>
          <Text>Popular</Text>
        </View>
      </React.Fragment>
    );
  };

  return {FirstRoute, SecondRoute};
};

export default function TabViewExample() {
  const {FirstRoute, SecondRoute} = Routes();
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const layout = useWindowDimensions();
  const color = 1;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Home'},
    // {key: 'second', title: 'Popular'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#226ddcff'}}
          style={{
            backgroundColor: 'white',
          }}
          renderLabel={({route}) => (
            <Text style={{color: 'black', margin: 8}}>{route.title}</Text>
          )}></TabBar>
      )}
    />
  );
}
