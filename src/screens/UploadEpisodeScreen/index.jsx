import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import * as Crypto from 'expo-crypto';
import * as DocumentPicker from 'expo-document-picker';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import BackIcon from '../../../assets/svg/back_icon.svg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Context from '../../context/Context';
import {
  addNewEpisode,
  getPodcastByUser,
  getUnansweredQuestions,
} from '../../firebase/firestore';
import { uploadEpisode } from '../../firebase/storage';
import styles from './styles';

const TOPICS = [
  'Chose Topic',
  'peer-pressure',
  'depression',
  'anxiety',
  'self-esteem',
  'burn-out',
  'stress',
];

export default function UploadEpisodeScreen() {
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  const { uid } = useContext(Context);
  const navigation = useNavigation();

  const [questions, setQuestions] = useState(null);
  const [audio, setAudio] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selecteds, setSelecteds] = useState(new Set());

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/mpeg',
    }).then((response) => {
      console.log(response);
      if (response.type == 'success') {
        let { name, size, uri } = response;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: 'application/' + fileType,
        };
        console.log(fileToUpload, '...............file');
        setAudio(fileToUpload);
      }
    });
    // console.log(result);
  };
  const [topic, setTopic] = useState('Chose Topic');

  const handleUpdate = async () => {
    const episodeID = Crypto.randomUUID();
    const fileUpload = await (await fetch(audio.uri)).blob();
    await uploadEpisode({ episodeID: episodeID }, fileUpload);
    const podcast = await getPodcastByUser(uid);
    await addNewEpisode({
      episodeID: episodeID,
      title: title,
      description: description,
      topic: topic,
      podcastID: podcast.podcastID,
      podcastName: podcast.name,
    });
    navigation.navigate('Home');
  };

  useEffect(() => {
    (async () => {
      const podcast = await getPodcastByUser(uid);
      const questions = await getUnansweredQuestions(podcast.podcastID);
      setQuestions(questions);
    })();
  }, []);

  return (
    <>
      <View style={styles.appBar}>
        <Pressable
          style={{ position: 'absolute', bottom: 0, left: 38 }}
          onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>
        <Text style={styles.screenTitle}>Upload</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={{ height: 130 }} />
        <Input
          placeholder="Title"
          value={title}
          onChangeText={(e) => setTitle(e)}
          onSubmitEditing={() => ref2.current.focus()}
        />
        <Input
          placeholder="Description"
          multiline
          numberOfLines={6}
          ref={ref2}
          value={description}
          onChangeText={(e) => setDescription(e)}
          onSubmitEditing={() => ref4.current.focus()}
          blurOnSubmit={false}
        />
        {/* <Input placeholder="Podcast"
                ref={ref3}
                onSubmitEditing={() => ref4.current.focus()}
                blurOnSubmit={false}  /> */}
        <View
          style={{
            borderWidth: 2,
            borderColor: '#A2A9B8',
            paddingHorizontal: 17,
            textAlignVertical: 'top',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginBottom: 40,
            fontSize: 16,
          }}>
          <Picker selectedValue={topic} onValueChange={(e) => setTopic(e)}>
            {TOPICS.map((topic, index) => (
              <Picker.Item key={topic} label={topic} value={topic} />
            ))}
          </Picker>
        </View>
        <Text style={{ fontWeight: 600, fontSize: 20, marginBottom: 10 }}>
          List of questions answered in this episode
        </Text>
        {questions === null ? (
          <Text>Loading</Text>
        ) : questions.length == 0 ? (
          <Text>No questions</Text>
        ) : (
          questions.map((question) => (
            <View
              key={question.questionID}
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Checkbox
                value={selecteds.has(question)}
                onValueChange={(b) => {
                  if (b) {
                    setSelecteds(new Set([...selecteds, question]));
                  } else {
                    setSelecteds(
                      new Set(
                        [...selecteds].filter(
                          (q) => q.questionID !== question.questionID
                        )
                      )
                    );
                  }
                }}
              />
              <Text numberOfLines={2} style={{ fontSize: 16 }}>
                {question.description}
              </Text>
            </View>
          ))
        )}
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Button
            content="Select file"
            onPress={pickFile}
            style={{ paddingVertical: 10, width: 130 }}
          />
          <Text>{audio ? audio.name : 'Choose a file .mp3'}</Text>
        </View>
        <Button
          content="Publish podcast"
          style={styles.button}
          ref={ref5}
          onPress={handleUpdate}
        />
      </ScrollView>
    </>
  );
}
