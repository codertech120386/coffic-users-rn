import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { RECENTLY_SEARCH_WORKSPACES, USER_SUBSCRIPTIONS } from "../../queries";
import ShowSubscriptions from "../../components/my-spaces-screen/ShowSubscriptions";
import NoSubscriptionsFoundExplore from "../../components/my-spaces-screen/NoSubscriptionsFoundExplore";
import defaultStyles from "../../AppCss";

export default function MySpacesScreen(props: any) {
  const {
    loading: activeLoading,
    error: activeError,
    data: activeData,
    refetch: activeRefetch,
  } = useQuery(USER_SUBSCRIPTIONS, {
    variables: {
      status: "pendingOrActive",
    },
  });

  const {
    loading: expiredLoading,
    error: expiredError,
    data: expiredData,
    refetch: expiredRefetch,
  } = useQuery(USER_SUBSCRIPTIONS, {
    variables: {
      status: "expired",
    },
  });

  const {
    loading: workspaceLoading,
    error: workspaceError,
    data: workspaceData,
    refetch: workspaceRefetch,
  } = useQuery(RECENTLY_SEARCH_WORKSPACES);

  useEffect(() => {
    activeRefetch({ status: "pendingOrActive" });
    expiredRefetch({ status: "expired" });
    workspaceRefetch();
  }, []);

  const exploreWorkspacesClicked = () => {
    props.navigation.navigate("Home");
  };

  const subscriptonCardButtonClicked = (
    buttonText: string,
    id: number | null = null
  ) => {
    if (buttonText === "Check Status") {
      // history.push(`/my-spaces/subscription-details/${subscription.id}`);
      props.navigation.navigate("MySpacesSubscriptionDetail", {
        id,
      });
    }
  };

  return (
    <View style={defaultStyles.container}>
      {activeData &&
      activeData.userSubscriptions &&
      activeData.userSubscriptions.length > 0 ? (
        <ShowSubscriptions
          activeSubscriptions={activeData.userSubscriptions}
          expiredSubscriptions={expiredData && expiredData.userSubscriptions}
          subscriptonCardButtonClicked={subscriptonCardButtonClicked}
        />
      ) : (
        <NoSubscriptionsFoundExplore
          workspaceData={workspaceData}
          exploreWorkspacesClicked={exploreWorkspacesClicked}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
