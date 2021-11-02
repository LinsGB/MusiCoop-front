import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import reactotron from 'reactotron-react-native';
const AudioPlayer = (props: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState<any>(null);
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
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
      console.log('1');
      setLoading(true);
      const status = await playbackObject.loadAsync({uri}, {shouldPlay: true});
      setIsPlaying(true);
      playbackObject.setOnPlaybackStatusUpdate(async (status: any) => {
        if (status.didJustFinish === true) {
          await playbackObject.unloadAsync();
          reactotron.debug('acabou');
          await setIsPlaying(false);
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
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }
    // It will resume our audio
    if (!isPlaying) {
      setLoading(true);
      let status;
      try {
        status = await playbackObject.playAsync();
      } catch (error) {
        status = await playbackObject.loadAsync({uri}, {shouldPlay: true});
      }
      setIsPlaying(true);
      playbackObject.setOnPlaybackStatusUpdate(async (status: any) => {
        if (status.didJustFinish === true) {
          await playbackObject.unloadAsync();
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginLeft: 5,
        maxWidth: 45,
      }}>
      {/* <Text style={{fontSize: 18, marginBottom: 15}}>{audio.filename}</Text> */}
      <View style={{flexDirection: 'row'}}>
        <Ionicons
          style={{
            backgroundColor: 'gray',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          name={isPlaying ? 'pause' : 'play'}
          size={24}
          color="white"
          onPress={handleAudioPlayPause}
        />
        {loading && (
          <ActivityIndicator
            style={{marginLeft: 5}}
            size="large"
            color="#c8c8c8"
          />
        )}
      </View>
    </View>
  );
};
export default AudioPlayer;
