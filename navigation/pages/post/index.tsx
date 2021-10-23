import React, {useState} from 'react';
import {Text, View} from '../../../components/Themed';

import {Picker} from '@react-native-picker/picker';

import styles from './styles';
import {Button, Pressable, TextInput} from 'react-native';
import AudioPlayer from '../../../components/audioPlayer';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Search from '../../../components/searchComponent';
import UploadFile from '../../../components/uploadComponent';

const postScreen = () => {
  const [selectedValue, setSelectedValue] = useState('java');
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text style={[{padding: 10, fontWeight: 'bold'}]}>
          Insira uma categoria
        </Text>
        <Search /> */}
        <View style={[{marginLeft: 20}]}>
          <View>
            <View style={{marginBottom: 20}}>
              <Text>Titulo</Text>
              <TextInput
                style={{fontWeight: 'bold'}}
                placeholder="Insira um titulo bacana pro seu post"
              />
            </View>
            <View>
              <Text>Descrição</Text>
              <TextInput
                style={{fontWeight: 'bold'}}
                placeholder="Insira uma descrição bacana pro seu post"
              />
            </View>
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
      <TouchableOpacity
        style={{
          backgroundColor: '#eee',
          alignItems: 'center',
          marginHorizontal: 40,
          marginBottom: 20,
          borderRadius: 100,
          padding: 10,
        }}
        onPress={() => alert('Função não implementada')}>
        <Text style={{color: '#2f95dc', fontWeight: 'bold'}}>Postar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default postScreen;
