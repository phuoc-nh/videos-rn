import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const videoHeight = screenHeight * 0.7;

export default function VideoScreen({ videoUri, thumbnailUri = 'https://roadmaptoprofit.com/wp-content/uploads/2018/10/video-placeholder.jpg' }: { videoUri: string, thumbnailUri?: string }) {
	const [showVideo, setShowVideo] = useState(false);

	const player = useVideoPlayer(videoUri, player => {
		player.loop = true;
	});

	useEvent(player, 'playingChange', {
		isPlaying: player.playing,
	});

	useEffect(() => {
		setShowVideo(false);

	}, [videoUri]);

	return (
		<View className="w-full justify-center items-center"
			style={{ height: videoHeight }}>
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
		</View>
	);
}