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
import Comments from '../components/Comments';

const Routes = () => {
  const [posts, setPosts] = useState(['Jp', 'lulu', 'linsguebe']);
  const [comments, setComments] = useState(false);
  useEffect(() => {
    //request de todos os posts
    //set posts
  }, []);
  const handleComments = () => {};
  const FirstRoute = () => {
    return (
      <React.Fragment>
        <ScrollView>
          <View
            style={{
              flex: 1,
            }}>
            <Comments></Comments>
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
    {key: 'first', title: 'Últimos posts'},
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
