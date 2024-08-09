import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Alert,
} from "react-native";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { getData, putData } from "../../api/api";
import { Dropdown } from "react-native-element-dropdown";
import RadioButton from "./RadioComponent";
import ComInput from "../../Components/ComInput/ComInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ComSelectedOneDate from "../../Components/ComDate/ComSelectedOneDate";
import { useStorage } from "../../hooks/useLocalStorage";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";

export default function WarrantyNewComponent() {
  const route = useRoute();
  const { id, machineryId, inventoryId, warrantyId } = route.params;
  const [components, setComponents] = useState([]);
  const [newInventory, setNewInventory] = useState([]);
  const [dropdownValues, setDropdownValues] = useState({});
  const [dropdownValuesChoose, setDropdownValuesChoose] = useState({});
  const [focusedDropdown, setFocusedDropdown] = useState(null);
  const [selectedComponentId, setSelectedComponentId] = useState(null); // Add state for selected component
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const [user, setUserData] = useStorage("user", {});
  //chụp ảnh
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const loginSchema = yup.object().shape({
    description: yup.string().trim().required("Vui lòng nhập chú thích"),
    // chon: yup.string().required("vui long nhap mk"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      description: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const getInventory = async () => {
    if (inventoryId) {
      const params = {
        MasterInventoryId: inventoryId,
        Condition: "CurrentlyinUse",
      };
      const res = await getData("inventories", params);
      const dataSet = res.data.filter((item) =>
        id.includes(item.machineComponentsId)
      );
      setComponents(dataSet);
    }
  };

  const dropdownData = newInventory.map((component) => ({
    label: component.serialNumber,
    value: component.id,
  }));

  const apiGetNewInventory = async (machineComponentsId) => {
    try {
      const params = {
        Condition: "New",
        MachineComponentsId: machineComponentsId,
      };
      const response = await getData("inventories", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching new inventory", error);
    }
  };

  const handleGetData = async (componentId) => {
    setFocusedDropdown(componentId);
    const newInventory = await apiGetNewInventory(componentId);
    setNewInventory(newInventory);
  };

  const handleDropdownChange = (itemId, value) => {
    // Find the selected item from dropdownData based on value
    const selectedItem = newInventory.find(
      (component) => component.id == value.value
    );

    //valuedropdown
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [itemId]: value,
    }));

    //value change
    setDropdownValuesChoose((prevValues) => ({
      ...prevValues,
      [itemId]: {
        ...prevValues[itemId],
        value, // Store the selected value
        name: selectedItem ? selectedItem.componentName : "", // Store the selected name
      },
    }));
  };

  const dropdownArray = Object.entries(dropdownValuesChoose).map(
    ([key, value]) => ({
      id: key,
      ...value,
    })
  );

  const generateInventoryUpdates = () => {
    return Object.entries(dropdownValues).map(
      ([componentId, newInventory]) => ({
        newInventoryId: newInventory.value, // New inventory ID (from dropdown selection)
        oldInventoryId: componentId, // Old inventory ID (component ID)
      })
    );
  };

  useEffect(() => {
    getInventory();
  }, [inventoryId]);

  useFocusEffect(
    useCallback(() => {
      getInventory();
      return () => {};
    }, [])
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const changeSelectedDate = (data) => {
    setSelectedDate(data);
  };

  //chụp ảnh
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

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.componentContainer}>
        <RadioButton
          selected={selectedComponentId === item.id}
          onPress={() => {
            setSelectedComponentId(item.id);
            if (focusedDropdown !== item.id) {
              handleGetData(item.machineComponentsId);
            }
          }}
        />
        <Text style={styles.componentName}>{item.componentName}</Text>
      </View>
      {selectedComponentId === item.id && (
        <View>
          <Dropdown
            style={[
              styles.dropdown,
              focusedDropdown === item.id && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropdownData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              focusedDropdown === item.id ? "..." : "Chọn bộ phận mới"
            }
            searchPlaceholder="Tìm bộ phận..."
            value={dropdownValues[item.id] || ""}
            onFocus={() => setFocusedDropdown(item.id)}
            onBlur={() => setFocusedDropdown(null)}
            onChange={(value) => {
              handleDropdownChange(item.id, value);
              setFocusedDropdown(null);
            }}
          />
        </View>
      )}
    </View>
  );

  const submit = (data) => {
    putData(`/warrantyDetail`, warrantyId, {
      ...data,
      status: "Repairing",
      nextMaintenanceDate: selectedDate + "T00:00:00.000Z",
      accountId: user.id,
      inventoryUpdates: generateInventoryUpdates(),
    })
      .then((res) => {
        Alert.alert("Thông báo", "Đã kiểm tra xong");
        navigation.navigate("WarrantyService");
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{
          paddingVertical: 10,
          marginHorizontal: 5,
          marginTop: 10,
          marginBottom: 20,
          height: "100%",
          flex: 1,
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backIconContainer}
          >
            <Image source={backArrowWhite} style={styles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Bộ phận hỏng</Text>
          <FlatList
            data={components}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <Text style={styles.title}>Bộ phận thay thế</Text>
          <FlatList
            data={dropdownArray}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View key={item.id}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ fontSize: 16 }}>{item.value.label}</Text>
              </View>
            )}
          />

          <View>
            <TouchableOpacity
              style={{
                marginTop: 15,
                marginBottom: 10,
                borderColor: "#000",
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                width: "45%",
                backgroundColor: "#dbd523",
              }}
              onPress={() => setOpenPopUp(!openPopUp)}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                Chọn bảo hành dự kiến
              </Text>
            </TouchableOpacity>
            <Modal animationType="slide" visible={openPopUp}>
              <ComSelectedOneDate
                date={changeSelectedDate}
                navigation={navigation}
                openPopUp={() => setOpenPopUp(!openPopUp)}
              />
            </Modal>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Ngày bảo hành dự kiến:{" "}
                {selectedDate && !isNaN(new Date(selectedDate).getTime())
                  ? new Date(selectedDate).toLocaleDateString()
                  : "Chưa chọn ngày"}
              </Text>
            </View>
          </View>
          {/* chụp ảnh */}
          <View>
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )}
            <TouchableOpacity
              style={{
                marginTop: 15,
                marginBottom: 10,
                borderColor: "#000",
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                width: "45%",
                backgroundColor: "#dbd523",
              }}
              onPress={openCamera}
            >
              <Text style={styles.textStyle}>Chụp ảnh</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FormProvider {...methods}>
              <View style={{ width: "100%", gap: 10 }}>
                <ComInput
                  label={"Chú thích"}
                  placeholder={""}
                  name="description"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                  numberOfLines={4}
                  multiline={true}
                />
              </View>
            </FormProvider>
          </View>
          <View style={styles.buttonContainer}>
            <ComSelectButton onPress={handleSubmit(submit)}>
              Xác nhận
            </ComSelectButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  header: {
    paddingTop: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  componentContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  componentName: {
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
  },
  buttonContainer: {
    marginVertical: 20,
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
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: "blue",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
