import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";

import { PRIVATE_URL } from "../config";
import CardLunch from "./CardLunch";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function PassedInvitations({ userState }) {
  const [myInvitations, setMyInvitations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const getMyInvitations = async () => {
      let response = await fetch(
        `${PRIVATE_URL}/passed-invit?id=${userState.id}`
      );
      let responseJson = await response.json();
      setMyInvitations(responseJson.invitations);
    };
    getMyInvitations();
  }, []);

  useEffect(() => {
    const getMyInvitations = async () => {
      let response = await fetch(
        `${PRIVATE_URL}/passed-invit?id=${userState.id}`
      );
      let responseJson = await response.json();
      setMyInvitations(responseJson.invitations);
    };
    getMyInvitations();
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {myInvitations.map((invit, i) => (
        <CardLunch invit={invit} key={i} />
      ))}
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return { userState: state.user };
}

export default connect(mapStateToProps, null)(PassedInvitations);
