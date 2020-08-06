import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

import { ImageSliderProps } from "../../ts-types";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const ImageSlider = ({ workspace, styleProps, location }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  let totalImages: number = 1;
  let image_urls: string[] = [];

  if (Object.keys(workspace).includes("images")) {
    image_urls = workspace.images.map((image: any) => image.image_url);
    totalImages = image_urls.length;
  } else if (Object.keys(workspace).includes("image_urls")) {
    image_urls = workspace.image_urls;
    totalImages = workspace.image_urls.length;
  }

  const onBackClickListener = () => {
    if (currentIndex != 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalImages - 1);
    }
  };

  const onForwardClickListener = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image_urls[currentIndex],
        }}
        style={{ ...styleProps }}
      />
      <View style={{ ...styles.iconContainer, width: styleProps.width }}>
        <View style={styles.iconView}>
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color="white"
            onPress={onBackClickListener}
          />
        </View>
        <View style={styles.iconView}>
          <Ionicons
            name="ios-arrow-forward"
            size={30}
            color="white"
            onPress={onForwardClickListener}
          />
        </View>
      </View>
    </View>
  );
};
export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    position: "relative",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
  },
  iconView: {
    backgroundColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
});
