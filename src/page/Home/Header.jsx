import React, { useCallback, useEffect, useState } from "react";
import ComAvatar from "../../Components/ComAvatar/ComAvatar";
import { StyleSheet, Text, View } from "react-native";
import { useStorage } from "../../hooks/useLocalStorage";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../../api/api";

export default function Header() {
  const [user, setData, reLoadData] = useStorage("user", {});
  const [userData, setUserData] = useState({});

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
    <View style={styles.header}>
      <ComAvatar />
      <View style={styles.text}>
        <Text>Xin chào!</Text>
        <Text style={styles.textName}>{user?.fullName}</Text>
      </View>
      <ComAvatar />
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
