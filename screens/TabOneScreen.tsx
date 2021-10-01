import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const FirstRoute = () => {
  return (
    <React.Fragment>
      <View style={{flex: 1, margin: 10}}>
        <Text>Home</Text>
      </View>
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

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const color = 1;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Home'},
    {key: 'second', title: 'Popular'},
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
