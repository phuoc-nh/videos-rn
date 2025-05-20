
import { ScrollView, Text, View } from "react-native";

export default function Index() {

  return (
    <View className="flex-1 bg-green">

      <ScrollView
        className="flex-1 px-5 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >


        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
}
