import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';

const audio = {
  filename: 'My Awesome Audio',
  uri: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
};

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState<any>(null);
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);

  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);

  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject.loadAsync(
        {uri: audio.uri},
        {shouldPlay: true},
      );
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
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };

  return (
    <View style={{flex: 1, padding: 50, backgroundColor: '#fff'}}>
      <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 15}}>
        {audio.filename}
      </Text>
      <Ionicons
        style={{
          alignSelf: 'center',
          backgroundColor: 'gray',
          padding: 10,
          borderRadius: 50,
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
