import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';

import {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import reactotron from 'reactotron-react-native';
import Contribution from '../components/Contribution';
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
            <ActivityIndicator style={{width: 12, height: 12, marginTop: 25}} />
          </View>
        )}
        <Contribution />
      </View>
    </View>
  );
};
export default ModalScreenUser;
