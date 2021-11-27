import React, {useState, useEffect} from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import reactotron from 'reactotron-react-native';
import Comments from '../components/Comments';
import {listPosts} from '../services/post';


const Routes = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    listPosts().then((posts) => {
      if (Array.isArray(posts)) {
        setLoading(false);
      }
      reactotron.debug(posts);
    });
  }, []);

  const FirstRoute = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#25214D'}}>
        <View style={{flex: 1}}>
          {loading && (
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator
                style={{width: 12, height: 12, marginTop: 20}}
                color="#c8c8c8"
              />
            </View>
          )}
          <Comments type={1}/>
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
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Últimos posts'},
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
