import { 
    Alert, 
    StyleSheet, 
    Text, 
    View, 
    Pressable, 
    Image,
    ScrollView,
    TextInput
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";

const HomeScreen = () => {
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "We are loading your location"
  );

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the apps to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel was pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("Ok was pressed"),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  return (
    <> 
    <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <View  style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
        </View>
        <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
                uri: "https://lh3.googleusercontent.com/ogw/AAEL6sh_yqHq38z35QMy5Fnb8ZIxicdxCIVM9PeBD2j-=s64-c-mo",
            }}
            />
        </Pressable>
        </View>

         {/* Search Bar */}
        <View style={styles.search_input_text}>
          <TextInput placeholder="Search for items or More" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* Image Carousel */}
        <Carousel />
    </ScrollView>
   
    </>
  );
   
};

export default HomeScreen;

const styles = StyleSheet.create({
    search_input_text: {
        padding: 10,
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.8,
        borderColor: "#C0C0C0",
        borderRadius: 7,
    }
});
