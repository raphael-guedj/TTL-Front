import React from "react";
import CurrentInvitations from "./CurrentInvitationsScreen";
import PassedInvitations from "./PassedInvitationsScreen";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabForky = createMaterialTopTabNavigator();

const InvitStack = () => {
  return (
    <TopTabForky.Navigator
      tabBarOptions={{
        activeTintColor: "#418581",
        indicatorStyle: { backgroundColor: "#F9B34C", height: 1 },
        labelStyle: { fontSize: 12 },
        style: {
          marginTop: 10,
          height: 45,
        },
      }}
      initialRouteName="Invitations récentes"
    >
      <TopTabForky.Screen
        name="Invitations récentes"
        component={CurrentInvitations}
      />
      <TopTabForky.Screen
        name="Invitations passées"
        component={PassedInvitations}
      />
    </TopTabForky.Navigator>
  );
};

export default function MyLunchesScreen() {
  return <InvitStack />;
}
