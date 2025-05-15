import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { getMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

export default function Search() {
	const [search, setSearch] = useState<string>('')

	const router = useRouter()
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
		refetch: loadMovies,
		reset
	} = useFetch(() => getMovies({ query: search }), false)

	useEffect(() => {

		const func = setTimeout(async () => {
			if (search.trim()) {
				loadMovies()


			} else {
				reset()
			}
		}, 500);

		return () => {
			clearTimeout(func)
		}
	}, [search])

	useEffect(() => {
		if (movies?.length > 0 && movies?.[0]) {
			updateSearchCount(search, movies[0])
		}
	}, [movies])

	return (
		<View className='flex-1  bg-primary'>
			<Image
				source={images.bg}
				className='w-full h-full flex-1 absolute z-0'
				resizeMode='cover'
			></Image>

			<FlatList
				data={movies}
				renderItem={({ item }) => (
					<MovieCard
						{...item}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: 'center',
					marginVertical: 16,
					gap: 16
				}}
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				ListHeaderComponent={() => (
					<>
						<View className='w-full flex-row justify-center mt-20 items-center'>
							<Image
								className='w-12 h-10'
								source={icons.logo}
							></Image>
						</View>
						<View className='my-5'>
							<SearchBar
								placeholder='Search movies ...'
								value={search}
								onChangeText={(text: string) => setSearch(text)}
								onPress={() => { }}
							></SearchBar>

						</View>

						{moviesLoading && (
							<ActivityIndicator
								size={'large'}
								color={'#fff'}
								className='my-5'
							></ActivityIndicator>
						)}

						{moviesError && (
							<View className='flex-1 bg-primary items-center justify-center'>
								<Text className='text-white'>Error: {moviesError.message}</Text>
							</View>
						)}

						{!moviesLoading && !moviesError && search.trim() && (
							<Text className='text-lg text-white font-bold mb-5'>
								Search results for <Text className='text-accent font-bold'>{search}</Text>
							</Text>
						)}


					</>
				)}
				ListEmptyComponent={() => (
					!loadMovies && !moviesError && <View className='flex-1  items-center justify-center'>
						<Text className='text-white font-bold text-lg'>No results found</Text>
					</View>
				)}
			></FlatList>
		</View>
	)
}