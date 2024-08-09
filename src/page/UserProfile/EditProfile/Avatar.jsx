import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function Avatar({ image, setImg }) {
  const [avatarSource, setAvatarSource] = useState(
    image ||
      "https://www.shutterstock.com/image-vector/worker-engineer-technician-mechanic-avatar-260nw-1983689702.jpg"
  );

  return (
    <View style={styles.body}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: avatarSource?.assets
              ? avatarSource?.assets[0]?.uri
              : "https://www.shutterstock.com/image-vector/worker-engineer-technician-mechanic-avatar-260nw-1983689702.jpg",
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
  avatarContainer: {
    position: "relative", // Quan trọng!
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    position: "absolute", // Quan trọng!
    bottom: 0,
    right: 0,
  },
});
