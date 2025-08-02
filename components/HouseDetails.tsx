import { Image, ImageSourcePropType, Text, View } from "react-native";

interface HouseDetailsProps {
  image: ImageSourcePropType;
  data: number;
  text: string;
}
const HouseDetails = ({ image, data, text }: HouseDetailsProps) => {
  return (
    <View className="flex flex-row items-center gap-2">
      <View className="p-3 bg-primary-100 rounded-full">
        <Image source={image} className="size-5" />
      </View>
      <Text className="font-rubik-medium text-sm text-black-300">
        {data} {text}
      </Text>
    </View>
  );
};

export default HouseDetails;
