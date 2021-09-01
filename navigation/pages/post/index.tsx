import React, {useState} from 'react';
import {Text, View} from '../../../components/Themed';

import {Picker} from '@react-native-picker/picker';

import styles from './styles';
import {TextInput} from 'react-native';
import AudioPlayer from '../../../components/audioPlayer';
import {ScrollView} from 'react-native-gesture-handler';
import Search from '../../../components/searchComponent';

const postScreen = () => {
  const [selectedValue, setSelectedValue] = useState('java');
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <View style={[{marginLeft: 20}]}>
          <Text style={[{marginBottom: 10}]}>Insira uma categoria</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View> */}
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
          <AudioPlayer />
        </View>
      </ScrollView>
    </View>
  );
};

export default postScreen;
