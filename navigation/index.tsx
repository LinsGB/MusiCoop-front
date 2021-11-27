import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Image} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreenUser from '../screens/ModalScreenUser';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import styles from './styles';
import TabTwoScreen from '../screens/userProfile/TabTwoScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import EditScreenInfo from '../components/EditScreenInfo';
import loginScreen from './pages/initialPage';
import SingUp from './pages/signUp';
import postScreen from './pages/post';
import ModalScreenPost from '../screens/ModalScreenPost';

import Post from '../assets/images/post.png';
import PostSelected from '../assets/images/post-selected.png';
import Home from '../assets/images/home.png';
import HomeSelected from '../assets/images/home-selected.png';
import User from '../assets/images/user.png';
import UserSelected from '../assets/images/user-selected.png';
import Splash from '../Splash';
import authScreen from './pages/auth';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={loginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SingUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={authScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Post"
        component={postScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      <Stack.Screen
        name="LogOff"
        component={EditScreenInfo}
        options={{headerShown: false}}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor: '#25214D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}>
        <Stack.Screen name="Modal" component={ModalScreenUser} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          presentation: 'modal',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#25214D',
          },
          headerTitleStyle: {
            color: '#fff',
          },
        }}>
        <Stack.Screen name="Postagem" component={ModalScreenPost} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: styles.navigationTabs,
        tabBarLabel: '',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#25214D',
        },
        tabBarInactiveBackgroundColor: '#25214D',
        tabBarActiveBackgroundColor: '#25214D',
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
          title: 'Início',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? HomeSelected : Home}
              style={{
                width: 23,
                height: 21,
              }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Post"
        component={postScreen}
        options={({navigation}: RootTabScreenProps<'Post'>) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? PostSelected : Post}
              resizeMode={'contain'}
              style={{
                width: 30,
                height: 38,
              }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Usuário',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? UserSelected : User}
              resizeMode={'contain'}
              style={{
                width: 23,
                height: 25,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
