import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import BackIcon from '../../../assets/svg/back_icon.svg';
import PauseIcon from '../../../assets/svg/pause1.svg';
import PlayActive from '../../../assets/svg/play_active.svg';
import NextIcon from '../../../assets/svg/skip-to-next.svg';
import PrevIcon from '../../../assets/svg/skip-to-previous.svg';
import Title from '../../components/Title/Title';
import Context from '../../context/Context';
import { getEpisodeUrl, getThumbnailUrl } from '../../firebase/storage';
import styles from './styles';

const MusicPlayer = ({ route }) => {
  const {
    handleAudio,
    sound,
    setSound,
    setSoundStatus,
    soundStatus,
    trackUrl,
    setTrackUrl,
    setPlayingFullScreen,
  } = React.useContext(Context);
  const navigation = useNavigation();

  const [thumbnail, setThumbnail] = React.useState(null);

  React.useEffect(() => {
    const handle = async () => {
      setTrackUrl(await getEpisodeUrl(route.params));
      const res = await getThumbnailUrl(route.params);
      console.log(res);
      setThumbnail(res);
    };
    if (route) handle();
  }, [route]);

  const transform = (ms) => {
    if (!ms) ms = 0;
    min = Math.floor((ms / 1000 / 60) << 0);
    if (min < 10) min = '0' + min;
    sec = Math.floor((ms / 1000) % 60);
    if (sec < 10) sec = '0' + sec;
    return min + ':' + sec;
  };

  return (
    <>
      <View style={styles.appBar}>
        <Pressable
          style={{ position: 'absolute', bottom: 0, left: 25 }}
          onPress={() => navigation.navigate('Home')}>
          <BackIcon />
        </Pressable>
        <Text style={styles.screenTitle}>Playing</Text>
      </View>
      <View style={styles.container}>
        {/* <Title title='Playing' /> */}
        <View style={styles.image}>
          <Image
            style={styles.imageSize}
            source={
              thumbnail
                ? { uri: thumbnail }
                : require('../../../assets/thumbnail.png')
            }
          />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {route.params ? route.params.title : 'The title'}
        </Text>
        <View>
          <Slider
            style={styles.progressBar}
            value={soundStatus.status ? soundStatus.status.positionMillis : 0}
            minimumValue={0}
            maximumValue={
              soundStatus.status ? soundStatus.status.durationMillis : 0
            }
            onValueChange={(value) => {
              sound && sound.setPositionAsync(value);
              setSoundStatus({ icon: 'play' });
            }}
            trackStyle={{ height: 4 }}
            thumbStyle={{ height: 20, width: 20 }}
            thumbTintColor="#6A5ACB"
            minimumTrackTintColor="#6A5ACB"
            maximumTrackTintColor="gray"
          />
        </View>
        <View style={styles.progressLevelDuraiton}>
          <Text style={styles.progressLabelText}>
            {soundStatus.status
              ? transform(soundStatus.status.positionMillis)
              : '00:00'}
          </Text>
          <Text style={styles.progressLabelText}>
            {soundStatus.status
              ? transform(soundStatus.status.durationMillis)
              : '00:00'}
          </Text>
        </View>
        <View style={styles.musicControl}>
          <Pressable>
            <PrevIcon width={60} height={60} />
          </Pressable>
          <Pressable onPress={() => handleAudio()}>
            {soundStatus.icon == 'pause' ? (
              <PlayActive width={80} height={80} />
            ) : (
              <PauseIcon width={80} height={80} />
            )}
          </Pressable>
          <Pressable>
            <NextIcon width={60} height={60} />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default MusicPlayer;
