import {react} from '@babel/types';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions, Text, RefreshControl} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import reactotron from 'reactotron-react-native';
import AudioPlayer from '../components/audioPlayer';
import Comments from '../components/Comments';
import TouchableButton from '../components/touchableButton';
import {listPosts} from '../services/post';

const Routes = () => {
  const [posts, setPosts] = useState([]);

  const [comments, setComments] = useState(false);
  useEffect(() => {
    reactotron.debug('oi');
    listPosts().then((posts) => {
      if (Array.isArray(posts)) {
        setPosts(posts);
      }
      reactotron.debug(posts);
    });
  }, []);

  const FirstRoute = () => {
    const [reload, setReload] = useState(0);
    const test = () => {
      setReload(reload + 1);
    };
    return (
      <View style={{flex: 1, backgroundColor: '#25214D'}}>
        <View style={{flex: 1}}>
          <Comments />
        </View>
      </View>
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
          indicatorStyle={{backgroundColor: '#484B72'}}
          style={{
            backgroundColor: '#25214D',
          }}
          renderLabel={({route}) => (
            <Text style={{color: '#fff', margin: 8}}>{route.title}</Text>
          )}></TabBar>
      )}
    />
  );
}
