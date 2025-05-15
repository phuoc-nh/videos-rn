import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
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
