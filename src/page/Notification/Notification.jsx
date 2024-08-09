import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import ComNotification from "./ComNotification/ComNotifications";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { getData } from "../../api/api";
import { useStorage } from "../../hooks/useLocalStorage";
import ComNotificationWarranty from "./ComNotification/ComNotificationsWarranty";
import { useFocusEffect } from "@react-navigation/native";

export default function Notification({}) {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterType, setFilterType] = useState("Delivery");
  const [user, setUserData] = useStorage("user", {});

  const getAllTask = async () => {
    if (user.id) {
      getData(`task?Status=Completed&AccountId=${user.id}`)
        .then((res) => {
          setTasks(res.data);
          filterTasks(res.data, filterType);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  const filterTasks = (tasks, type) => {
    const filtered = tasks.filter((task) => task.type === type);
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    getAllTask();
  }, [user.id]);

  useEffect(() => {
    filterTasks(tasks, filterType);
  }, [filterType, tasks]);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        getAllTask();
      }, 10);
      return () => {};
    }, [user.id])
  );

  return (
    <View style={styles.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles?.scrollView}
      >
        <View style={styles?.buttonContainer}>
          <ComSelectButton
            onPress={() => handleFilterChange("Delivery")}
            check={filterType === "Delivery"}
          >
            Giao hàng
          </ComSelectButton>
          <ComSelectButton
            onPress={() => handleFilterChange("Warranty")}
            check={filterType === "Warranty"}
          >
            Bảo hành
          </ComSelectButton>
          <View style={{ width: 20 }}></View>
        </View>
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles?.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {filterType === "Delivery" ? (
          <ComNotification tile={"Giao hàng"} data={filteredTasks} />
        ) : (
          <ComNotificationWarranty tile={"Bảo hành"} data={filteredTasks} />
        )}

        <View style={{ height: 190 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
