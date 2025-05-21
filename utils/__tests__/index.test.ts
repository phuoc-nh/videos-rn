import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { formatDuration, pickVideo } from '..';

jest.mock('expo-image-picker');
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('formatDuration', () => {
  it('formats milliseconds to mm:ss', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(61000)).toBe('1:01');
    expect(formatDuration(125000)).toBe('2:05');
  });
});

describe('pickVideo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if permission is not granted', async () => {
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });
    const result = await pickVideo();
    expect(Alert.alert).toHaveBeenCalled();
    expect(result).toBeNull();
  });


  it('returns null and alerts if file is too large', async () => {
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ fileSize: 51 * 1024 * 1024 }],
    });
    const result = await pickVideo();
    expect(Alert.alert).toHaveBeenCalledWith('File too large', 'Please select a video smaller than 50MB.');
    expect(result).toBeNull();
  });

  it('returns asset if everything is fine', async () => {
    const asset = { fileSize: 10 * 1024 * 1024 };
    (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [asset],
    });
    const result = await pickVideo();
    expect(result).toBe(asset);
  });
});