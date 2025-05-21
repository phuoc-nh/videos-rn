import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Keyboard, Pressable } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export default function VideoScreen({ videoUri, thumbnailUri = 'https://roadmaptoprofit.com/wp-content/uploads/2018/10/video-placeholder.jpg' }: { videoUri: string, thumbnailUri?: string }) {
	const [showVideo, setShowVideo] = useState(false);
	const [keyboardVisible, setKeyboardVisible] = useState(false);

	const player = useVideoPlayer(videoUri, player => {
		player.loop = true;
	});

	useEvent(player, 'playingChange', {
		isPlaying: player.playing,
	});

	useEffect(() => {
		setShowVideo(false);

	}, [videoUri]);

	useEffect(() => {
		const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
		const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
		return () => {
			showSub.remove();
			hideSub.remove();
		};
	}, []);
	const animatedHeight = useRef(new Animated.Value(screenHeight * 0.7)).current;

	useEffect(() => {
		Animated.timing(animatedHeight, {
			toValue: keyboardVisible ? screenHeight * 0.3 : screenHeight * 0.7,
			duration: 100,
			useNativeDriver: false,
		}).start();
	}, [keyboardVisible]);

	return (
		<Animated.View className="w-full justify-center items-center"
			style={{ height: animatedHeight }}>
			{!showVideo ? (
				<Pressable className="w-full h-full justify-center items-center bg-black"
					onPress={() => {
						setShowVideo(true);
						player.play();
					}}
				>
					<Image testID='thumbnail-image' source={{ uri: thumbnailUri }} className="w-full h-full object-cover" />

				</Pressable>
			) : (
				<VideoView
					player={player}
					allowsFullscreen
					allowsPictureInPicture
					style={{ width: '100%', height: '100%' }}
				/>
			)}
		</Animated.View>
	);
}