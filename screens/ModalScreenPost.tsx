import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import Colors from '../constants/Colors';
import logoUsuario from '../assets/images/fffa.png';
import * as DocumentPicker from 'expo-document-picker';
import clipe from '../assets/images/clipe.png';
import reactotron from 'reactotron-react-native';

const ModalScreenPost = ({route}: {route: any}) => {
  const items = route.params;
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    //@ts-ignore
    setUri(result.uri);
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <ScrollView style={{backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              flex: 1,
            }}>
            <Image
              source={logoUsuario}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            />
            <Text>Nome do usuario</Text>
          </View>
          <Text style={styles.title}>{items.postTitle}</Text>
          <View>
            <View style={styles.getStartedContainer}>
              <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                Conteudo do post
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{borderTopWidth: 1, borderColor: '#eee'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity onPress={pickDocument}>
            <Image
              source={clipe}
              style={{
                marginTop: 10,
                width: 17,
                height: 15,
              }}
            />
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: 'bold'}}>Enviar</Text>
          </View>
        </View>
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            paddingLeft: 10,
            borderColor: '#C8C8C8',
            backgroundColor: '#FFFFFF',
            marginBottom: 10,
            margin: 10,
          }}
          underlineColorAndroid="transparent"
          placeholder="Faça uma colaboração"></TextInput>
      </View>
    </React.Fragment>
  );
};
export default ModalScreenPost;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    width: '80%',
  },
  getStartedContainer: {},
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 15,
    lineHeight: 24,
  },
  helpContainer: {},
  helpLink: {},
  helpLinkText: {},
});
