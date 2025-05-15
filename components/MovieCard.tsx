import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function MovieCard({ id, poster_path, title, release_date, vote_average, overview }: Movie) {
	return (
		<Link href={`/movies/${id.toString()}`} asChild>
			<TouchableOpacity className='w-[30%]'>
				<Image
					source={{
						uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placeholder.co/600x900?text=No+Image'
					}}
					className='w-full h-52 rounded-lg'
					resizeMode='cover'
				/>
				<Text className='text-white font-bold text-sm' numberOfLines={1}>{title} </Text>
				<View className='flex-row justify-start items-center gap-x-1'>
					<Image
						source={icons.star}
						className='size-4'
					/>
					<Text className='text-white text-xs font-bold uppercase'>{vote_average}</Text>
				</View>
				<View className='flex-row justify-between items-center mt-2'>
					<Text className='text-light-300 font-bold text-sm'>{release_date.split('-')[0]}</Text>
					{/* <Text className='text-light-300 font-bold text-sm'>Movie</Text> */}
				</View>
			</TouchableOpacity>
		</Link>
	)
}