import React, {useState} from 'react';
import {Text, View} from '../../../components/Themed';

import {Picker} from '@react-native-picker/picker';

import styles from './styles';
import {TextInput} from 'react-native';
import AudioPlayer from '../../../components/audioPlayer';
import {ScrollView} from 'react-native-gesture-handler';
import Search from '../../../components/searchComponent';
import UploadFile from '../../../components/uploadComponent';

const postScreen = () => {
  const [selectedValue, setSelectedValue] = useState('java');
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[{padding: 10, fontWeight: 'bold'}]}>
          Insira uma categoria
        </Text>
        <Search />
        <View
          style={styles.separator}
          lightColor="#C8C8C8"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={[{marginLeft: 20}]}>
          <View>
            <TextInput
              style={{fontWeight: 'bold'}}
              placeholder="Insira um titulo bacana pro seu post"
            />
          </View>
        </View>
        <View
          style={styles.separator}
          lightColor="#C8C8C8"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View>
          <UploadFile />
        </View>
      </ScrollView>
    </View>
  );
};

export default postScreen;
