import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { PRIVATE_URL } from "../config";
import { connect } from "react-redux";
import MyInvitationReceivedScreen from "./MyInvitationReceivedScreen";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const NotifScreenReceived = ({ userState, navigation }) => {
  const [invit, setInvit] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getInvitSent = async () => {
    let rawResponse = await fetch(
      `${PRIVATE_URL}/invitreceived?id=${userState.id}`
    );
    let response = await rawResponse.json();
    setInvit(response.invit);
  };

  useEffect(() => {
    getInvitSent();
  }, []);

  const onRefresh = React.useCallback(() => {
    getInvitSent();
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 5 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {invit.map((invitation, i) => (
        <MyInvitationReceivedScreen
          key={invitation._id}
          dataInvit={invitation}
          onRefresh={onRefresh}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    padding: 15,
  },
  containerImgData: {
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  },
  reviewIcon: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  verticleLine: {
    height: "80%",
    alignSelf: "center",
    width: 2,
    backgroundColor: "#CCCCCC",
  },
  containerLocation: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  containerInvit: {
    width: "100%",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#418581",
  },
});

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(NotifScreenReceived);
