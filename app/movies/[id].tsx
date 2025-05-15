import { icons } from '@/constants/icons'
import { getMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const MovieInfo = ({ label, value }: { label: string, value: string | null }) => {
	return (
		<View className='flex-col items-start gap-x-1 mt-3 justify-center'>
			<Text className='text-light-200 text-sm '>{label}</Text>
			<Text className='text-white font-bold text-sm'>{value || 'N/A'}</Text>
		</View>
	)
}

export default function MovieDetails() {
	const { id } = useLocalSearchParams()
	const { data: movie } = useFetch(() => getMovieDetails(id as string))
	const router = useRouter()
	if (!movie) {
		return (
			<View className='bg-primary flex-1 items-center justify-center'>
				<Text className='text-white text-lg font-bold'>Loading...</Text>
			</View>
		)
	}

	return (
		<View className='bg-primary flex-1'>
			<ScrollView contentContainerStyle={{
				paddingBottom: 80,
			}}>
				<View>
					<Image
						source={{
							uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placeholder.co/600x900?text=No+Image'
						}}
						className='w-full h-[550px]'
						resizeMode='stretch'
					/>
				</View>
				<View className='flex-col items-start justify-center mt-4 mb-4'>
					<Text className='text-white text-2xl font-bold'>
						{movie.title}
					</Text>

					<View className='flex-row items-center gap-x-1 mt-2'>
						<Text className='text-light-200 text-sm '>{movie.release_date.split('-')[0]}</Text>
						<Text className='text-light-200 text-sm '>{movie.runtime}m</Text>
					</View>

					<View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-3'>
						<Image
							source={icons.star}
							className='w-4 h-4'
						/>
						<Text className='text-white font-bold text-sm'>
							{movie.vote_average}
						</Text>
						<Text className='text-light-200 text-sm'>
							({movie.vote_count} votes)
						</Text>
					</View>

					<MovieInfo
						label='Overview'
						value={movie.overview}
					></MovieInfo>
					<MovieInfo
						label='Genres'
						value={movie.genres.map((genre: { name: string }) => genre.name).join(', ')}
					></MovieInfo>
					<View className='flex flex-row justify-between w-1/2'>
						<MovieInfo
							label='Budget'
							value={`${movie.budget / 1000000}M`}
						></MovieInfo>
						<MovieInfo
							label='Revenue'
							value={`${movie.revenue / 1000000}M`}
						></MovieInfo>
					</View>
					<MovieInfo
						label='Production Companies'
						value={movie.production_companies.map((company: { name: string }) => company.name).join(', ')}
					></MovieInfo>


				</View>
			</ScrollView>
			<TouchableOpacity onPress={router.back} className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'>
				<Image
					source={icons.arrow}
					className='w-5 mr-1 mt-0.5 text-white rotate-180'
					tintColor={'#fff'}
				></Image>
				<Text className='text-white font-semibold text-base'>Go back</Text>
			</TouchableOpacity>
		</View>
	)
}