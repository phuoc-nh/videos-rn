import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import VideoScreen from '../VideoScreen';

jest.mock('expo-video', () => ({
	useVideoPlayer: jest.fn(() => ({
		loop: false,
		play: jest.fn(),
		playing: false,
	})),
	VideoView: ({ player, ...props }: any) => <></>,
}));

jest.mock('expo', () => ({
	useEvent: jest.fn(),
}));

describe('VideoScreen', () => {
	const videoUri = 'file://test.mp4';
	const thumbnailUri = 'https://example.com/thumb.jpg';

	it('renders thumbnail before playback', () => {
		const { getByTestId } = render(<VideoScreen videoUri={videoUri} thumbnailUri={thumbnailUri} />);
		const image = getByTestId('thumbnail-image');

		expect(image.props.source.uri).toBe(thumbnailUri);
	});

	it('shows VideoView after pressing thumbnail', () => {
		const { getByTestId, queryByTestId } = render(<VideoScreen videoUri={videoUri} thumbnailUri={thumbnailUri} />);
		const pressable = getByTestId('thumbnail-image');

		fireEvent.press(pressable);
		expect(queryByTestId('thumbnail-image')).toBeNull();
	});

});