// import { useEvent } from 'expo';
// import { useVideoPlayer, VideoView } from 'expo-video';
// import { Dimensions, StyleSheet, View } from 'react-native';

// const screenHeight = Dimensions.get('window').height;
// const videoHeight = screenHeight * 0.7;

// export default function VideoScreen({ videoUri }: { videoUri: string }) {
// 	const player = useVideoPlayer(videoUri, player => {
// 		player.loop = true;
// 		player.play();
// 	});

// 	const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

// 	return (
// 		<View style={styles.contentContainer}>
// 			<VideoView
// 				player={player}
// 				allowsFullscreen
// 				allowsPictureInPicture
// 				style={styles.video}
// 			/>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	contentContainer: {
// 		height: videoHeight,
// 		width: '100%',
// 	},
// 	// somehow VideoView does not take className
// 	video: {
// 		width: '100%',
// 		height: '100%',
// 		padding: 0
// 	},
// });


import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Pressable, View } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const videoHeight = screenHeight * 0.7;

export default function VideoScreen({ videoUri, thumbnailUri = 'https://roadmaptoprofit.com/wp-content/uploads/2018/10/video-placeholder.jpg' }: { videoUri: string, thumbnailUri?: string }) {
	const [isLoaded, setIsLoaded] = useState(false);
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
		<View style={{ height: videoHeight, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
			{!showVideo ? (
				<Pressable style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}
					onPress={() => {
						setShowVideo(true);
						player.play();
					}}
				>
					{thumbnailUri ? (
						<Image source={{ uri: thumbnailUri }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
					) : (
						<ActivityIndicator size="large" color="#fff" />
					)}
					{/* You can add a play icon overlay here */}
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