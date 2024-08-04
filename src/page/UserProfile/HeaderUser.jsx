import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import editIcon from "../../../assets/profile_icons/edit.png";
import { useStorage } from "../../hooks/useLocalStorage";
import { getData } from "../../api/api";

export default function HeaderUser() {
  const [user, setData, reLoadData] = useStorage("user", {});
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  const edit = () => {
    navigation.navigate("EditProfile");
  };
  const DetailProfile = () => {
    navigation.navigate("DetailProfile");
  };

  const GetDetailProfile = async () => {
    if (user.id) {
      getData(`/users/${user.id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetDetailProfile();
      reLoadData();
      return () => {
        GetDetailProfile();
        reLoadData();
      };
    }, [])
  );

  useEffect(() => {
    GetDetailProfile();
  }, [user]);

  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.container} onPress={DetailProfile}>
        <Image
          source={{
            uri: "https://www.shutterstock.com/image-vector/worker-engineer-technician-mechanic-avatar-260nw-1983689702.jpg",
          }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{userData?.fullName}</Text>
          <Text style={styles.phone}>{userData?.phoneNumber}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={edit}>
          <Image
            source={editIcon} // Thay thế bằng đường dẫn đến icon chỉnh sửa
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 16,
    color: "#555",
  },
  editButton: {
    padding: 10,
  },
  editIcon: {
    width: 30,
    height: 30,
  },
});
