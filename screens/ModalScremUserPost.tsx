import * as React from 'react';

import {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import reactotron from 'reactotron-react-native';
import Comments from '../components/Posts';
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
