import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { IWorkspaceCard } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";
import { FONTSTYLES } from "../../constants";
import ImageSlider from "../ui/ImageSlider";

const WorkspaceCard = ({
  workspace,
  single,
  currentWorkspaceId,
  alone,
  showDetailsClicked,
}: IWorkspaceCard) => {
  const onWorkspaceCardClickListener = (workspaceId: number) => {
    // history.push(`/workspace/${workspace_id}`);
    showDetailsClicked(workspaceId);
  };

  const showWorkspacePerDayCost = (perDay: number) => {
    if (perDay) {
      return (
        <>
          <CustomText style={defaultStyles.extraSmall}>
            &#8377;{perDay / 100}{" "}
          </CustomText>
          / day
        </>
      );
    } else {
      return (
        <CustomText style={defaultStyles.extraSmall}>
          {" "}
          Free trial available{" "}
        </CustomText>
      );
    }
  };

  const { height, width } = Dimensions.get("window");

  const opens_at_array =
    workspace && workspace.opens_at && workspace.opens_at.split(":");
  const closes_at_array =
    workspace && workspace.closes_at && workspace.closes_at.split(":");
  let opens_at = opens_at_array && `${opens_at_array[0]}:${opens_at_array[1]}`;
  let closes_at =
    closes_at_array && `${closes_at_array[0]}:${closes_at_array[1]}`;
  let images = workspace && workspace.image_urls;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onWorkspaceCardClickListener(workspace && +workspace.id)}
    >
      <ImageSlider
        workspace={workspace}
        location="workspaceCard"
        styleProps={{ width: width * 0.7, height: (width * 0.7 * 9) / 16 }}
      />
      {/* <Image
        source={{
          uri: images && images[0],
        }}
        style={{ width: width * 0.7, height: (width * 0.7 * 9) / 16 }}
      /> */}

      {!alone ? (
        <View
          style={{
            width: "100%",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText style={defaultStyles.extraSmall}>
            {workspace && workspace.short_address}
          </CustomText>
          <CustomText style={defaultStyles.extraSmall}>
            {opens_at} - {closes_at}
          </CustomText>
        </View>
      ) : (
        <View
          style={{
            width: width * 0.7,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText style={defaultStyles.extraSmall}>
            {workspace.short_address}
          </CustomText>
          <CustomText style={defaultStyles.extraSmall}>
            {opens_at} - {closes_at}
          </CustomText>
        </View>
      )}
      <View
        style={{
          width: width * 0.7,
          alignItems: "flex-start",
          marginTop: 5,
        }}
      >
        <CustomText
          style={{ ...defaultStyles.small, fontFamily: FONTSTYLES.semiBold }}
        >
          {workspace.name}
        </CustomText>

        <CustomText style={{ ...defaultStyles.extraSmall, marginTop: 5 }}>
          {showWorkspacePerDayCost(+workspace.per_day)}
        </CustomText>
        {/* <small className='also-in-cofficX '>
            Included in CofficX
          </small> */}
      </View>
    </TouchableOpacity>
  );
};
export default WorkspaceCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
});
