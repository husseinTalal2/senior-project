import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";

const ImageSlider = ({ imgs }: { imgs: string[] }) => {
  // const images = [
  //   'https://example.com/image1.jpg',
  //   'https://example.com/image2.jpg',
  //   'https://example.com/image3.jpg',
  //   // Add more image URLs as needed
  // ];

  return (
    <View style={styles.pagerView}>
      {imgs.map((image, index) => (
        <View key={index} style={styles.page}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSlider;
