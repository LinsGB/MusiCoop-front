import {Platform} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.configure({
  name: 'Musicoop',
  host: '192.168.0.5',
  port: 9090,
})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    asyncStorage: true,
    editor: true,
    errors: false,
    overlay: false,
  })
  .use(reactotronRedux())
  .connect();

export default reactotron;
