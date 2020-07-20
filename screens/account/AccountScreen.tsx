import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

import { USER_PERSONAL_DETAILS_MINI } from "../../queries";
import defaultStyles, { Colors } from "../../AppCss";
import { AccountPageCard } from "../../components/account-screen/AccountPageCard";
import { CustomText } from "../../components/ui/CustomText";

export default function AccountScreen(props: any) {
  const { loading, error, data } = useQuery(USER_PERSONAL_DETAILS_MINI);

  const userPersonalDetails = data && data.userPersonalDetails;

  const showProfileImage = () => {
    if (userPersonalDetails && userPersonalDetails.profile_image_url) {
      return (
        <img src={userPersonalDetails.profile_image_url} alt="profile"></img>
      );
    } else if (userPersonalDetails && userPersonalDetails.name) {
      const name = userPersonalDetails.name.split(" ").join("+");
      return (
        <img
          src={`https://ui-avatars.com/api/?background=eceff1&color=7a7a7a&name=${name}&rounded=true`}
          alt="profile"
        ></img>
      );
    }
    return null;
  };

  const onRedirectToIconClicked = (redirectPath: string) => {
    console.log("redicrect", redirectPath);
    props.navigation.navigate(redirectPath);
  };

  const onUserProfileClicked = () => {
    // history.push({
    //   pathname: `/user-profile`,
    //   state: {
    //     data: {
    //       profileImageUrl:
    //         userPersonalDetails && userPersonalDetails.profile_image_url,
    //       name: userPersonalDetails && userPersonalDetails.name,
    //     },
    //   },
    // });
  };

  return (
    <View style={{ ...defaultStyles.container, ...styles.container }}>
      <View>
        {showProfileImage()}
        <View>
          <CustomText style={defaultStyles.h4Text}>
            {userPersonalDetails && userPersonalDetails.name}{" "}
          </CustomText>
          <CustomText style={defaultStyles.h6Text}>
            {userPersonalDetails && userPersonalDetails.email}{" "}
          </CustomText>
        </View>
        <Ionicons
          name="ios-arrow-forward"
          size={23}
          color="white"
          onClick={onUserProfileClicked}
        />
      </View>
      <View style={styles.cardContainer}>
        <AccountPageCard
          icon={
            <Svg width="35" height="36" viewBox="0 0 35 36">
              <Path
                d="M1 19.89L13.5 26.14L26 19.89M1 13.64L13.5 19.89L26 13.64M13.5 1.13995L1 7.38995L13.5 13.64L26 7.38995L13.5 1.13995Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          }
          title="Recent Searches"
          subTitle="Quick review of past searches"
          redirectPath={"RecentSearches"}
          onRedirectToIconClicked={onRedirectToIconClicked}
        />
      </View>

      <View style={styles.cardContainer}>
        <AccountPageCard
          icon={
            <Svg width="35" height="36" viewBox="0 0 35 36">
              <Path
                d="M0.5 17.3899C0.5 17.3899 1.75 16.1399 5.5 16.1399C9.25 16.1399 11.75 18.6399 15.5 18.6399C19.25 18.6399 20.5 17.3899 20.5 17.3899V2.38989C20.5 2.38989 19.25 3.63989 15.5 3.63989C11.75 3.63989 9.25 1.13989 5.5 1.13989C1.75 1.13989 0.5 2.38989 0.5 2.38989V17.3899ZM0.5 17.3899V26.1399"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          }
          title="Checkins"
          subTitle="Quick review of past checkins"
          redirectPath={"CheckinHistory"}
          onRedirectToIconClicked={onRedirectToIconClicked}
        />
      </View>

      <View style={styles.cardContainer}>
        <AccountPageCard
          icon={
            <Svg width="35" height="36" viewBox="0 0 35 36">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 3.88989C2 3.61375 2.22386 3.38989 2.5 3.38989H7.5C7.73831 3.38989 7.94351 3.55809 7.99028 3.79176L9.16078 9.63989H30C30.149 9.63989 30.2903 9.70636 30.3852 9.82117C30.4802 9.93598 30.5191 10.0872 30.4911 10.2336L28.4911 20.7211L28.4904 20.7248C28.3533 21.4154 27.9776 22.0357 27.4291 22.4772C26.8819 22.9177 26.1976 23.1522 25.4954 23.1399H13.3546C12.6524 23.1522 11.9681 22.9177 11.4209 22.4772C10.8725 22.0358 10.4968 21.4156 10.3596 20.7251C10.3596 20.725 10.3596 20.7252 10.3596 20.7251L8.26695 10.2694C8.26153 10.2492 8.25735 10.2284 8.2545 10.2072L7.09016 4.38989H2.5C2.22386 4.38989 2 4.16603 2 3.88989ZM9.36092 10.6399L11.3403 20.5293C11.4317 20.9897 11.6823 21.4039 12.048 21.6983C12.4136 21.9926 12.8711 22.149 13.3404 22.14L13.35 22.1398L25.5096 22.1399C25.9789 22.1489 26.4364 21.9926 26.802 21.6983C27.1672 21.4044 27.4174 20.9916 27.5092 20.5319C27.5093 20.5313 27.5095 20.5306 27.5096 20.53L29.3956 10.6399H9.36092ZM12.5 28.1399C12.0858 28.1399 11.75 28.4757 11.75 28.8899C11.75 29.3041 12.0858 29.6399 12.5 29.6399C12.9142 29.6399 13.25 29.3041 13.25 28.8899C13.25 28.4757 12.9142 28.1399 12.5 28.1399ZM10.75 28.8899C10.75 27.9234 11.5335 27.1399 12.5 27.1399C13.4665 27.1399 14.25 27.9234 14.25 28.8899C14.25 29.8564 13.4665 30.6399 12.5 30.6399C11.5335 30.6399 10.75 29.8564 10.75 28.8899ZM26.25 28.1399C25.8358 28.1399 25.5 28.4757 25.5 28.8899C25.5 29.3041 25.8358 29.6399 26.25 29.6399C26.6642 29.6399 27 29.3041 27 28.8899C27 28.4757 26.6642 28.1399 26.25 28.1399ZM24.5 28.8899C24.5 27.9234 25.2835 27.1399 26.25 27.1399C27.2165 27.1399 28 27.9234 28 28.8899C28 29.8564 27.2165 30.6399 26.25 30.6399C25.2835 30.6399 24.5 29.8564 24.5 28.8899Z"
                fill="white"
              />
            </Svg>
          }
          title="Purchase History"
          subTitle="Purchase details and invoices"
          redirectPath={"PurchaseHistory"}
          onRedirectToIconClicked={onRedirectToIconClicked}
        />
      </View>

      <View style={styles.cardContainer}>
        <AccountPageCard
          icon={
            <Svg width="29" height="22" viewBox="0 0 29 22">
              <Path
                d="M0.75 8.14038H28.25M3.25 0.640381H25.75C27.1307 0.640381 28.25 1.75967 28.25 3.14038V18.1404C28.25 19.5211 27.1307 20.6404 25.75 20.6404H3.25C1.86929 20.6404 0.75 19.5211 0.75 18.1404V3.14038C0.75 1.75967 1.86929 0.640381 3.25 0.640381Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          }
          title="Coupon Codes"
          subTitle="Discount codes for your next purchase "
          redirectPath={"CouponCodes"}
          onRedirectToIconClicked={onRedirectToIconClicked}
        />
      </View>

      <View style={styles.cardContainer}>
        <AccountPageCard
          icon={
            <Svg width="35" height="36" viewBox="0 0 35 36">
              <Path
                d="M17.5 21.3904C19.5711 21.3904 21.25 19.7114 21.25 17.6404C21.25 15.5693 19.5711 13.8904 17.5 13.8904C15.4289 13.8904 13.75 15.5693 13.75 17.6404C13.75 19.7114 15.4289 21.3904 17.5 21.3904Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M26.75 21.3904C26.5836 21.7674 26.534 22.1856 26.6075 22.5911C26.681 22.9966 26.8743 23.3708 27.1625 23.6654L27.2375 23.7404C27.4699 23.9726 27.6543 24.2483 27.7801 24.5518C27.906 24.8553 27.9707 25.1806 27.9707 25.5091C27.9707 25.8377 27.906 26.163 27.7801 26.4665C27.6543 26.77 27.4699 27.0457 27.2375 27.2779C27.0053 27.5103 26.7296 27.6947 26.4261 27.8205C26.1226 27.9463 25.7973 28.0111 25.4688 28.0111C25.1402 28.0111 24.8149 27.9463 24.5114 27.8205C24.2079 27.6947 23.9322 27.5103 23.7 27.2779L23.625 27.2029C23.3304 26.9147 22.9562 26.7214 22.5507 26.6479C22.1452 26.5744 21.727 26.624 21.35 26.7904C20.9803 26.9488 20.665 27.2119 20.4429 27.5473C20.2208 27.8827 20.1016 28.2756 20.1 28.6779V28.8904C20.1 29.5534 19.8366 30.1893 19.3678 30.6581C18.8989 31.127 18.263 31.3904 17.6 31.3904C16.937 31.3904 16.3011 31.127 15.8322 30.6581C15.3634 30.1893 15.1 29.5534 15.1 28.8904V28.7779C15.0903 28.3641 14.9564 27.9629 14.7156 27.6263C14.4749 27.2896 14.1384 27.0332 13.75 26.8904C13.373 26.724 12.9548 26.6744 12.5493 26.7479C12.1438 26.8214 11.7696 27.0147 11.475 27.3029L11.4 27.3779C11.1678 27.6103 10.8921 27.7947 10.5886 27.9205C10.2851 28.0463 9.95979 28.1111 9.63125 28.1111C9.30271 28.1111 8.97739 28.0463 8.6739 27.9205C8.3704 27.7947 8.09468 27.6103 7.8625 27.3779C7.63006 27.1457 7.44566 26.87 7.31985 26.5665C7.19404 26.263 7.12928 25.9377 7.12928 25.6091C7.12928 25.2806 7.19404 24.9553 7.31985 24.6518C7.44566 24.3483 7.63006 24.0726 7.8625 23.8404L7.9375 23.7654C8.22567 23.4708 8.41898 23.0966 8.49251 22.6911C8.56603 22.2856 8.51639 21.8674 8.35 21.4904C8.19155 21.1207 7.92844 20.8054 7.59308 20.5833C7.25772 20.3612 6.86473 20.242 6.4625 20.2404H6.25C5.58696 20.2404 4.95107 19.977 4.48223 19.5081C4.01339 19.0393 3.75 18.4034 3.75 17.7404C3.75 17.0773 4.01339 16.4415 4.48223 15.9726C4.95107 15.5038 5.58696 15.2404 6.25 15.2404H6.3625C6.77624 15.2307 7.17751 15.0968 7.51412 14.856C7.85074 14.6153 8.10714 14.2788 8.25 13.8904C8.41639 13.5134 8.46603 13.0951 8.39251 12.6896C8.31898 12.2842 8.12567 11.91 7.8375 11.6154L7.7625 11.5404C7.53006 11.3082 7.34566 11.0325 7.21985 10.729C7.09404 10.4255 7.02928 10.1002 7.02928 9.77163C7.02928 9.44309 7.09404 9.11778 7.21985 8.81428C7.34566 8.51078 7.53006 8.23506 7.7625 8.00288C7.99468 7.77044 8.2704 7.58604 8.5739 7.46023C8.87739 7.33442 9.20271 7.26966 9.53125 7.26966C9.85979 7.26966 10.1851 7.33442 10.4886 7.46023C10.7921 7.58604 11.0678 7.77044 11.3 8.00288L11.375 8.07788C11.6696 8.36605 12.0438 8.55936 12.4493 8.63289C12.8548 8.70641 13.273 8.65677 13.65 8.49038H13.75C14.1197 8.33193 14.435 8.06883 14.6571 7.73346C14.8792 7.3981 14.9984 7.00511 15 6.60288V6.39038C15 5.72734 15.2634 5.09145 15.7322 4.62261C16.2011 4.15377 16.837 3.89038 17.5 3.89038C18.163 3.89038 18.7989 4.15377 19.2678 4.62261C19.7366 5.09145 20 5.72734 20 6.39038V6.50288C20.0016 6.90511 20.1208 7.2981 20.3429 7.63346C20.565 7.96883 20.8803 8.23193 21.25 8.39038C21.627 8.55677 22.0452 8.60641 22.4507 8.53289C22.8562 8.45936 23.2304 8.26605 23.525 7.97788L23.6 7.90288C23.8322 7.67044 24.1079 7.48604 24.4114 7.36023C24.7149 7.23442 25.0402 7.16966 25.3688 7.16966C25.6973 7.16966 26.0226 7.23442 26.3261 7.36023C26.6296 7.48604 26.9053 7.67044 27.1375 7.90288C27.3699 8.13506 27.5543 8.41078 27.6801 8.71428C27.806 9.01778 27.8707 9.34309 27.8707 9.67163C27.8707 10.0002 27.806 10.3255 27.6801 10.629C27.5543 10.9325 27.3699 11.2082 27.1375 11.4404L27.0625 11.5154C26.7743 11.81 26.581 12.1842 26.5075 12.5896C26.434 12.9951 26.4836 13.4134 26.65 13.7904V13.8904C26.8085 14.2601 27.0716 14.5754 27.4069 14.7975C27.7423 15.0196 28.1353 15.1388 28.5375 15.1404H28.75C29.413 15.1404 30.0489 15.4038 30.5178 15.8726C30.9866 16.3415 31.25 16.9773 31.25 17.6404C31.25 18.3034 30.9866 18.9393 30.5178 19.4081C30.0489 19.877 29.413 20.1404 28.75 20.1404H28.6375C28.2353 20.142 27.8423 20.2612 27.5069 20.4833C27.1716 20.7054 26.9085 21.0207 26.75 21.3904Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          }
          title="Support"
          subTitle="Reset password, FAQ, contact us and more"
          redirectPath={"Support"}
          onRedirectToIconClicked={onRedirectToIconClicked}
        />
      </View>

      <View style={styles.cardContainer}>
        <AccountPageCard
          icon={
            <Svg width="25" height="25" viewBox="0 0 25 25">
              <Path
                d="M8.75 23.89H3.75C3.08696 23.89 2.45107 23.6266 1.98223 23.1578C1.51339 22.6889 1.25 22.0531 1.25 21.39V3.89001C1.25 3.22697 1.51339 2.59109 1.98223 2.12225C2.45107 1.65341 3.08696 1.39001 3.75 1.39001H8.75M17.5 18.89L23.75 12.64M23.75 12.64L17.5 6.39001M23.75 12.64H8.75"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          }
          title="Sign Out"
          subTitle="Version 1.10"
          redirectPath={"SignOut"}
          onRedirectToIconClicked={onRedirectToIconClicked}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  cardContainer: {
    width: "90%",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
  },
});
