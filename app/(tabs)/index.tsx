import VideoScreen from '@/components/VideoScreen';
import { formatDuration, pickVideo } from '@/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Alert, Button, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Upload() {
  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');
  const [video, setVideo] = useState<string | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<{ filename: string, duration: number, size: number } | null>(null);

  useEffect(() => {
    (async () => {
      const savedUri = await AsyncStorage.getItem('videoUri');
      const savedMetadata = await AsyncStorage.getItem('metadata');
      const savedTitle = await AsyncStorage.getItem('title');
      const savedDescription = await AsyncStorage.getItem('description');

      if (savedUri) setVideo(savedUri);
      if (savedMetadata) setVideoMetadata(JSON.parse(savedMetadata));
      if (savedTitle) onChangeTitle(savedTitle);
      if (savedDescription) onChangeDescription(savedDescription);
    })();
  }, []);


  const handleVideo = async () => {
    const asset = await pickVideo();
    await AsyncStorage.clear();
    if (!asset) return;

    setVideo(asset.uri);
    const temp = {
      filename: asset.fileName || 'Unknown',
      duration: asset.duration || 0,
      size: asset.fileSize || 0,
    }
    setVideoMetadata(temp);

    // Persist the video URI
    await AsyncStorage.setItem('videoUri', asset.uri);
    await AsyncStorage.setItem('metadata', JSON.stringify(temp));

  };


  const handleSubmit = async () => {
    if (video) {
      await AsyncStorage.setItem('videoUri', video);
      await AsyncStorage.setItem('title', title);
      await AsyncStorage.setItem('description', description);
      Alert.alert("Saved", "Video info saved successfully");
    }
  }


  if (!video || !videoMetadata) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Text className='text-2xl font-bold text-center mb-5'>Upload a Video</Text>

          <Pressable
            className="bg-blue-500 rounded-lg py-3 mb-4 w-[30%] self-center"
            onPress={handleVideo}
          >
            <Text className="text-white text-center font-bold">Select Video</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 ">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // adjust if you have a header
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Text className='text-2xl font-bold text-center mb-5'>Upload a Video</Text>

          <VideoScreen videoUri={video} />

          <View className='px-4'>
            <Text className='text-sm'>Name: {videoMetadata?.filename}. Duration: {videoMetadata?.duration !== null ? formatDuration(videoMetadata.duration) : 'Loading...'}. Size: {(videoMetadata.size / (1024 * 1024)).toFixed(2)}MB</Text>

            <Pressable
              className="bg-blue-500 rounded-lg py-3 my-4 w-[30%] self-center"
              onPress={handleVideo}
            >
              <Text className="text-white text-center font-bold">Change Video</Text>
            </Pressable>

            <Text className='text-sm font-bold'>Title</Text>
            <TextInput
              placeholder='Title'
              onChangeText={onChangeTitle}
              value={title}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white text-base"
            />

            <Text className='text-sm font-bold'>Description</Text>
            <TextInput
              placeholder='Description'
              onChangeText={onChangeDescription}
              value={description}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white text-base"
            />

            <Button disabled={!title || !description || !video} title="Submit" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}


