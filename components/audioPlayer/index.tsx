import React, { useEffect, useState, useContext } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import reactotron from 'reactotron-react-native';
import Play from '../../assets/images/play.png';
import Pause from '../../assets/images/pause.png';
import { Reload } from '../../context/reload'

const AudioPlayer = (props: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState<any>(null);
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useContext(Reload)
  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
    setIsPlaying(false);
  }, []);
  const uri = props.uri;
  useEffect(
    () => async () => {
      await playbackObject.pauseAsync();
    },
    [playbackObject],
  );

  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      try {
        await pauseAudios()
      } catch (error) {
        console.log("ERROR => ", error)
      }
      console.log('1');
      setLoading(true);
      const status = await playbackObject.loadAsync({ uri }, { shouldPlay: true });
      setContext([...context, playbackObject])
      setIsPlaying(true);
      playbackObject.setOnPlaybackStatusUpdate(async (status: any) => {
        if (status.didJustFinish === true) {
          await playbackObject.unloadAsync();
          //global.isPlaying = false
          setIsPlaying(false);
          setPlaybackObject(new Audio.Sound());
        }
        if (status.isPlaying === true) {
          setLoading(false);
        }
      });
      return setPlaybackStatus(status);
    }
    // It will pause our audio
    if (isPlaying) {
      const status = await playbackObject.pauseAsync();
      //global.isPlaying = false
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }
    // It will resume our audio
    if (!isPlaying) {
      try {
        await pauseAudios()
      } catch (error) {
        console.log("ERROR => ", error)
      }
      setLoading(true);
      let status;
      try {
        status = await playbackObject.playAsync();
      } catch (error) {
        status = await playbackObject.loadAsync({ uri }, { shouldPlay: true });
      }
      //global.isPlaying = true
      setIsPlaying(true);
      playbackObject.setOnPlaybackStatusUpdate(async (status: any) => {
        if (status.didJustFinish === true) {
          await playbackObject.unloadAsync();
          //global.isPlaying = false
          await setIsPlaying(false);
          setPlaybackObject(new Audio.Sound());
        }
        if (status.isPlaying === true) {
          setLoading(false);
        }
      });
      return setPlaybackStatus(status);
    }
  };

  const pauseAudios = async () => {
    for (const music of context) {
      await music.pauseAsync();
    }
  }

  return (
    <View
      style={{
        marginLeft: 5,
      }}>
      {/* <Text style={{fontSize: 18, marginBottom: 15}}>{audio.filename}</Text> */}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#36375F',
            borderRadius: 10,
            height: 50,
            width: 40,
          }}
          onPress={handleAudioPlayPause}>
          {loading ? (
            <ActivityIndicator
              style={{ width: 12, height: 12 }}
              color="#c8c8c8"
            />
          ) : (
            <Image source={isPlaying ? Pause : Play} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AudioPlayer;
