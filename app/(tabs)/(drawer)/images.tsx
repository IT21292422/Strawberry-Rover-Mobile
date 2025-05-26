import ScreenWrapper from "@/components/ScreenWrapper";
import { useGetRoverImageData } from "@/utils/api";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "expo-image";
import useRoverStore from "@/store/RoverStore";
import data from "@/constants/imageData.json";
import { useTranslation } from "react-i18next";

const Images = () => {
  const { t } = useTranslation();
  // const currentRoverId = useRoverStore((state) => state.currentRoverId);
  // const { data: roverData } = useGetRoverImageData(currentRoverId);
  // const sortedDataByLatest = roverData
  //   ? [...roverData].sort(
  //       (a, b) =>
  //         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  //     )
  //   : [];

  return (
    <ScreenWrapper>
      <Text className="text-2xl font-bold text-center my-4">{t("images")}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-5 mb-5 rounded-2xl">
            <Image
              source={{ uri: item.blob_url }}
              style={{ width: "100%", height: 200 }}
            />
            <Text className="text-center mt-2 text-gray-600">
              {t("captured")}: {new Date(item.created_at).toLocaleString()}
            </Text>
            <Text className="text-center mt-2 text-gray-600">
              {t("temperature")}: {item.temp}°C
            </Text>
            <Text className="text-center mt-2 text-gray-600">
              {t("humidity")}: {item.humidity}%
            </Text>
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default Images;
