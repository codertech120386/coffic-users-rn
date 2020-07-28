import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import Svg, { Path } from "react-native-svg";
import moment from "moment";

import { GET_SUBSCRIPTION } from "../../queries";
import SubscriptionCard from "../../components/my-spaces-screen/SubscriptionCard";
import { CustomText } from "../../components/ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";

const WorkspaceSubscriptionPurchasedScreen = (props: any) => {
  const { loading, error, data } = useQuery(GET_SUBSCRIPTION, {
    variables: {
      id: +props.route.params.id,
    },
  });

  const gotoMySpacesClickListener = () => {
    props.navigation.navigate("MySpaces");
    // history.push("/my-spaces");
  };

  const checkinFailed = () => {};

  const subscription = data && data.subscription;
  const payment = subscription && subscription.payment;
  const plan = payment && payment.plan;
  const workspace = plan && plan.workspace;
  const images = workspace && workspace.images;
  const firstImageUrl = images && images[0].image_url;
  const secondImageUrl =
    images && images.length > 1 ? images && images[1].image_url : firstImageUrl;
  const short_address = workspace && workspace.addresses[0].short_address;
  const startDate = moment(subscription && subscription.start_date).format(
    "DD MMMM"
  );
  const endDate = moment(subscription && subscription.end_date).format(
    "DD MMMM YYYY"
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Image source={{ uri: firstImageUrl }} style={styles.workspaceImage} />
      <View style={styles.innerContainer}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <Path
              d="M36.0001 0.000146817C55.8823 0.000146817 72.0001 16.1179 72.0001 36.0001C72.0001 55.8823 55.8823 72.0001 36.0001 72.0001C16.1179 72.0001 0.000149323 55.8823 0.000149323 36.0001C-0.0564242 16.1743 15.9696 0.0567204 35.7952 0.000146817C35.8635 -4.89391e-05 35.9318 -4.89391e-05 36.0001 0.000146817Z"
              fill="#61C6BB"
            />
            <Path
              d="M55.943 26.0793L30.3748 51.6474L16.0566 37.4316L21.8863 31.7043L30.3748 40.0907L50.1135 20.3521L55.943 26.0793Z"
              fill="white"
            />
          </Svg>

          <CustomText
            style={{
              ...defaultStyles.littleSmall,
              color: Colors.primary,
              marginVertical: 7,
            }}
          >
            Congratulations
          </CustomText>
          <CustomText style={defaultStyles.h3Text}>Workspace Booked</CustomText>
        </View>

        <SubscriptionCard
          subscription={subscription}
          showBottomOptions={false}
          checkinFailed={checkinFailed}
          showBottomBorder={false}
          styleProps={{ backgroundColor: "white" }}
        />
        <CustomText style={{ ...defaultStyles.extraSmall, marginVertical: 10 }}>
          Great, we have received your purchase. We are now checking with the
          workspace to confirm your booking.
        </CustomText>
        <CustomText style={defaultStyles.small}>
          Check booking status in My Spaces
        </CustomText>

        {/* ----- Go to My Spaces Button ------ */}
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              width: "70%",
            }}
          >
            <CustomText
              onPress={gotoMySpacesClickListener}
              style={{
                ...defaultStyles.h6Text,
                paddingHorizontal: 25,
                paddingVertical: 10,
                color: "white",
                textAlign: "center",
              }}
            >
              Go to My Spaces
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default WorkspaceSubscriptionPurchasedScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "90%",
  },
  workspaceImage: {
    width: "100%",
    height: 175,
  },
});
