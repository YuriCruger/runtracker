import React from "react";
import { Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Container } from "./styles";

export function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Swipeable
        renderLeftActions={() => (
          <View
            style={{
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginRight: 10,
            }}
          >
            <Text>Left</Text>
          </View>
        )}
      >
        <View
          style={{ backgroundColor: "#f3a", padding: 50, borderRadius: 10 }}
        >
          <Text>Profile Page</Text>
        </View>
      </Swipeable>
    </View>
  );
}
