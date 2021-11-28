import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import {useState, useEffect} from 'react';
import {View, useWindowDimensions, Text, ActivityIndicator} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import reactotron from 'reactotron-react-native';
import Comments from '../components/Comments';
import {listPosts} from '../services/post';

const ModalScreenUser = ({navigation}: {navigation: any}) => {
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
  return (
    <View style={{flex: 1, backgroundColor: '#25214D'}}>
      <View>
        {loading && (
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator
              style={{width: 12, height: 12, marginTop: 25}}
              color="#c8c8c8"
            />
          </View>
        )}
        <Comments type={2} />
      </View>
    </View>
  );
};
export default ModalScreenUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
