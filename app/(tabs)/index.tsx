import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies)
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => getMovies({ query: '' }))


  if (moviesLoading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  if (moviesError) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white">Error: {moviesError.message}</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute  w-full z-0"
      ></Image>

      <ScrollView
        className="flex-1 px-5 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,

        }}
      >
        <Image
          className="w-12 h-10 mt-20 mb-5 mx-auto"
          source={icons.logo}
        ></Image>


        <View className="mb-5 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          ></SearchBar>
        </View>


        {trendingMovies && trendingMovies.length > 0 && (
          <View className="mt-10">
            <Text className="text-white text-lg font-bold mb-5">
              Trending movies
            </Text>
            <FlatList
              className="mb-3 mt-3"
              data={trendingMovies}
              showsHorizontalScrollIndicator={false}
              horizontal
              ItemSeparatorComponent={() => <View className="w-2"></View>}
              renderItem={({ item, index }) => (
                <TrendingCard
                  movie={item}
                  index={index}

                >
                </TrendingCard>
              )}
              keyExtractor={(item) => item.movie_id.toString()}
            ></FlatList>
          </View>
        )}

        <Text className="text-lg text-white font-bold mb-5">Latest movies</Text>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <MovieCard {...item}>

            </MovieCard>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-5 pb-32"
          scrollEnabled={false}
        ></FlatList>


      </ScrollView>
    </View>
  );
}
