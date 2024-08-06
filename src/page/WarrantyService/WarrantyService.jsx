import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  ActivityIndicator,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComAddPackage from "./ComAddPackage";
import { LanguageContext } from "../../contexts/LanguageContext";
import { getData } from "../../api/api";
import { useStorage } from "../../hooks/useLocalStorage";
import { useFocusEffect } from "@react-navigation/native";

export default function WarrantyService() {
  const [user, setUserData] = useStorage("user", {});
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    GetWarrantyTask();
    setRefreshing(false);
  }, []);

  const searchSchema = yup.object().shape({
    search: yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await getData(
        `task?Type=Warranty&AccountId=${user.id}&search=${data.search}`
      );
      const filteredData = response.data.filter(
        (task) => task.status === "Process"
      );
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const GetWarrantyTask = async () => {
    const type = "Warranty";
    if (user.id) {
      setLoading(true);
      try {
        const response = await getData(
          `task?Type=${type}&AccountId=${user.id}`
        );
        const filteredData = response.data.filter(
          (task) => task.status === "Process"
        );
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    GetWarrantyTask();
  }, [user.id]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        GetWarrantyTask();
      }, 10);
      return () => {};
    }, [user.id])
  );

  return (
    <>
      <ComHeader showBackIcon={true} showTitle={true} title={"Bảo hành"} />
      <View style={styles.container}>
        <FormProvider {...methods}>
          <ComInputSearch
            placeholder="Tìm kiếm"
            keyboardType="default"
            name="search"
            control={control}
            onSubmitEditing={handleSubmit(onSubmit)}
            errors={errors}
          />
        </FormProvider>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : data.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ marginTop: "2%" }}>
              {data.map((value, index) => (
                <ComAddPackage key={index} data={value} />
              ))}
            </View>
            <View style={{ height: 120 }}></View>
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "10%",
                }}
              >
                Không có nhiệm vụ được giao
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
});
