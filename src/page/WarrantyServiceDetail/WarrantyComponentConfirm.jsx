import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";

import { getData } from "../../api/api";
import Checkbox from "expo-checkbox";

export default function WarrantyComponentConfirm() {
  const route = useRoute();
  const { id, inventoryId, warrantyId } = route.params;
  const [components, setComponents] = useState({});

  const [selectedServices, setSelectedServices] = useState([]);

  const toggleServiceSelection = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(serviceId)) {
        return prevSelectedServices.filter((id) => id !== serviceId);
      } else {
        return [...prevSelectedServices, serviceId];
      }
    });
  };

  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const navigation = useNavigation();

  const getComponent = (id) => {
    if (id) {
      getData(`machinery/${id}`).then((res) => {
        setComponents(res.data);
      });
    }
  };

  useEffect(() => {
    getComponent(id);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      getComponent();
      return () => {};
    }, [])
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}
        >
          <Image source={backArrowWhite} style={styles.backIcon} />
        </TouchableOpacity>
        {components?.image && components.image.length > 0 && (
          <Image
            source={{ uri: components.image[0].imageURL }}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "stretch",
              borderRadius: 5,
              marginBottom: 10,
            }}
          />
        )}
      </View>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
            numberOfLines={2}
          >
            {components?.name}
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Bộ phận máy</Text>
        </ScrollView>
        <FlatList
          data={components?.component}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleServiceSelection(item.id)}>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text>
                  <Checkbox
                    value={selectedServices.includes(item.id)}
                    onValueChange={() => toggleServiceSelection(item.id)}
                    color={
                      selectedServices.includes(item.id) ? "#dbd523" : undefined
                    }
                  />{" "}
                  <Text> {item.name}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={{ marginVertical: 20 }}>
          <ComSelectButton
            onPress={() => {
              navigation.navigate("WarrantyNewComponent", {
                id: selectedServices,
                machineryId: components.id,
                inventoryId: inventoryId,
                warrantyId: warrantyId,
              });
            }}
          >
            Tiếp theo
          </ComSelectButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  header: {
    paddingTop: 50,
  },
  contentBold: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  backIconContainer: {
    position: "absolute",
    zIndex: 100,
    marginTop: 60,
    marginLeft: 10,
    padding: 3,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backIcon: {
    width: 50,
    height: 50,
  },
});
