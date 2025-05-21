// utils/pickVideo.ts
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export function formatDuration(ms: number) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export async function pickVideo(): Promise<ImagePicker.ImagePickerAsset | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission required', 'Go to settings and allow permission to access the media library');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const asset = result.assets[0];
    const sizeMB = (asset.fileSize || 0) / (1024 * 1024);
    if (sizeMB > 50) {
      Alert.alert('File too large', 'Please select a video smaller than 50MB.');
      return null;
    }
    return asset;
  }
  return null;
}
