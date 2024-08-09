import {
  launchCameraAsync,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Text } from "react-native";

const CameraWithLocation = () => {
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);

  const openCamera = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== "granted") {
      setError("Cần cấp quyền cho máy ảnh");
      return;
    }

    const response = await launchCameraAsync({ mediaType: "photo" });
    if (!response.canceled) {
      setImageUri(response.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setError("Cần cấp quyền truy cập thư viện ảnh");
      return;
    }

    const response = await launchImageLibraryAsync({ mediaType: "photo" });
    if (!response.canceled) {
      setImageUri(response.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Chụp ảnh" onPress={openCamera} />
      <Button title="Mở thư viện" onPress={openGallery} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default CameraWithLocation;
