import React, { useState, useEffect } from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AudioPlayer from '../components/audioPlayer';




const Routes = () => {
  const [posts, setPosts] = useState([1, 2, 3])
  useEffect(() => {
    //request de todos os posts
    //set posts
  }, [])
  const FirstRoute = () => {

    return (
      <React.Fragment>
        <View style={{ flex: 1, margin: 10 }}>
          {posts.map(post => {
            //const {title, comments, music} = post
            return (
              <>
                <Text>{post}</Text>
                <AudioPlayer />
              </>
            )
          })}
        </View>
      </React.Fragment>
    );
  };

  const SecondRoute = () => {
    return (
      <React.Fragment>
        <View style={{ flex: 1, margin: 10 }}>
          <Text>Popular</Text>
        </View>
      </React.Fragment>
    );
  };

  return { FirstRoute, SecondRoute }
}



export default function TabViewExample() {
  const { FirstRoute, SecondRoute } = Routes()
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const layout = useWindowDimensions();
  const color = 1;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Home' },
    { key: 'second', title: 'Popular' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#226ddcff' }}
          style={{
            backgroundColor: 'white',
          }}
          renderLabel={({ route }) => (
            <Text style={{ color: 'black', margin: 8 }}>{route.title}</Text>
          )}></TabBar>
      )}
    />
  );
}
