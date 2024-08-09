import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/page/Login/Login";
import Register from "./src/page/Register/Register";
import Home from "./src/page/Home/Home";
import RegisterSuccess from "./src/page/Register/RegisterSuccess";
import Otp from "./src/page/Otp/Otp";
import ComIcon from "./src/Components/ComIcon/ComIcon";
import ServicePackages from "./src/page/ServicePackages/ServicePackages";
import Notification from "./src/page/Notification/Notification";
import ServiceHistory from "./src/page/ServiceHistory/ServiceHistory/ServiceHistory";
import ServiceHistoryDetail from "./src/page/ServiceHistory/ServiceHistoryDetail/ServiceHistoryDetail";
import UserProfile from "./src/page/UserProfile/UserProfile";
import EditProfile from "./src/page/UserProfile/EditProfile/EditProfile";
import DetailProfile from "./src/page/UserProfile/DetailProfile";
import ForgetPassword from "./src/page/ForgetPassword/ForgetPassword";
import OtpForgetPassword from "./src/page/ForgetPassword/OtpForgetPassword";
import ResetPassword from "./src/page/ForgetPassword/ResetPassword";
import ResetPasswordSuccess from "./src/page/ForgetPassword/ResetPasswordSuccess";
import ChangePassword from "./src/page/ChangePassword/ChangePassword";
import ChangePasswordSuccess from "./src/page/ChangePassword/ChangePasswordSuccess";
import Contracts from "./src/page/Contract/Contracts";
import ContractDetail from "./src/page/ContractDetail/ContractDetail";
import ContractCandSuccess from "./src/page/ContractDetail/ContractCandSuccess";
import DeliveryService from "./src/page/DeliveryService/DeliveryService";
import DeliveryDetail from "./src/page/DeliveryDetail/DeliveryDetail";
import WarrantyService from "./src/page/WarrantyService/WarrantyService";
import WarrantyServiceDetail from "./src/page/WarrantyServiceDetail/WarrantyServiceDetail";
import WarrantyComponentConfirm from "./src/page/WarrantyServiceDetail/WarrantyComponentConfirm";
import WarrantyNewComponent from "./src/page/WarrantyServiceDetail/WarrantyNewComponents";
import OrderDetails from "./src/page/DeliveryDetail/OrderDetails";
import PushNotification from "./src/page/Notification/PushNotification";
import CameraWithLocation from "./src/page/CameraLocation/CameraWithLocation";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Homes"
          options={{ headerLeft: null, headerShown: false }}
          component={MyBottomNavigationBar}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="PushNotification"
          component={PushNotification}
        />

        <Stack.Screen
          name="HomeUser"
          options={{ headerLeft: null, headerShown: false }}
          component={MyBottomNavigationBarUser}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="RegisterSuccess"
          component={RegisterSuccess}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Otp"
          component={Otp}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Service"
          component={ServicePackages}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="WarrantyService"
          component={WarrantyService}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="WarrantyServiceDetail"
          component={WarrantyServiceDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="WarrantyComponentConfirm"
          component={WarrantyComponentConfirm}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="WarrantyNewComponent"
          component={WarrantyNewComponent}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="CameraWithLocation"
          component={CameraWithLocation}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="DeliveryService"
          component={DeliveryService}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="DeliveryDetail"
          component={DeliveryDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="OrderDetails"
          component={OrderDetails}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ServiceHistory"
          component={ServiceHistory}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ServiceHistoryDetail"
          component={ServiceHistoryDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="DetailProfile"
          component={DetailProfile}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ChangePassword"
          component={ChangePassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ChangePasswordSuccess"
          component={ChangePasswordSuccess}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ForgetPassword"
          component={ForgetPassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="OtpForgetPassword"
          component={OtpForgetPassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ResetPasswordSuccess"
          component={ResetPasswordSuccess}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Contracts"
          component={Contracts}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ContractDetail"
          component={ContractDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ContractCandSuccess"
          component={ContractCandSuccess}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="NotificationPage"
        component={Home}
      />
      <HomeStack.Screen name="Details" component={Login} />
    </HomeStack.Navigator>
  );
}
function MyBottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#f2eb18",
          borderRadius: 15,
          height: 90,
          elevation: 30, // Bóng đổ cho Android
          shadowColor: "#000", // Màu của bóng đổ cho iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "Nav1" : "Nav1_1";
          } else if (route.name === "Visitation") {
            iconName = focused ? "Nav2" : "Nav2_1";
          } else if (route.name === "HealthCondition") {
            iconName = focused ? "Nav3" : "Nav3_1";
          } else if (route.name === "Notification") {
            iconName = focused ? "Nav4" : "Nav4_1";
          } else if (route.name === "Account") {
            iconName = focused ? "Nav5" : "Nav5_1";
          }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={"back"} />;
          return <ComIcon icon={iconName} />;
        },
      })}
      // keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Notification"
        options={{ headerShown: false }}
        component={Notification}
      />
      <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}
function MyBottomNavigationBarUser() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#14A499",
          borderRadius: 15,
          height: 90,
          elevation: 30, // Bóng đổ cho Android
          shadowColor: "#000", // Màu của bóng đổ cho iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "Nav1" : "Nav1_1";
          } else if (route.name === "Visitation") {
            iconName = focused ? "Nav2" : "Nav2_1";
          } else if (route.name === "HealthCondition") {
            iconName = focused ? "Nav3" : "Nav3_1";
          } else if (route.name === "Notification") {
            iconName = focused ? "Nav4" : "Nav4_1";
          } else if (route.name === "Account") {
            iconName = focused ? "Nav5" : "Nav5_1";
          }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={"back"} />;
          return <ComIcon icon={iconName} />;
        },
      })}
      // keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Notification"
        options={{ headerShown: false }}
        component={Notification}
      />
      <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}

export default Routes;
