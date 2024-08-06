import React, { useCallback, useEffect, useState } from "react";
import ComAvatar from "../../Components/ComAvatar/ComAvatar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useStorage } from "../../hooks/useLocalStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getData } from "../../api/api";

export default function Header() {
  const [user, setData, reLoadData] = useStorage("user", {});
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

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

  const DetailProfile = () => {
    navigation.navigate("DetailProfile");
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
    <View style={styles.header}>
      <TouchableOpacity style={styles.header} onPress={DetailProfile}>
        <ComAvatar />
        <View style={styles.text}>
          <Text>Xin chào!</Text>
          <Text style={styles.textName}>{user?.fullName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 6,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    flex: 1,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
