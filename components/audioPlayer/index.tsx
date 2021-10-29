import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import reactotron from 'reactotron-react-native';

const AudioPlayer = (props: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState<any>(null);
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);
  const [song, setSong] = useState();

  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
    setIsPlaying(false);
  }, []);
  const uri = props.uri || `http://192.168.0.61:8000/musics/${props.id}`;

  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject.loadAsync({uri}, {shouldPlay: true});
      if (playbackObject.didJustFinish === true) {
        reactotron.debug('aosdkasokdsao');
      }
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }

    // It will pause our audio
    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }

    // It will resume our audio
    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      playbackObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          await playbackObject.unloadAsync();
          reactotron.debug('acabou');
          await setIsPlaying(false);
          setPlaybackObject(new Audio.Sound());
        }
      });

      setIsPlaying(true);
      return setPlaybackStatus(status);
    }

    if (playbackStatus.didJustFinish) {
      reactotron.debug('ACABOOOOO');
    }
  };

  const restartSong = async () => {
    const status = await playbackObject.replayAsync();
    setIsPlaying(false);
    return setPlaybackStatus(status);
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
    </View>
  );
};

export default AudioPlayer;
