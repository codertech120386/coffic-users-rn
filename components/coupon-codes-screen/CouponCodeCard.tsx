import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import moment from "moment";

import { ICouponCodeCardProps } from "../../ts-types";

import { CouponContext } from "../../context/CouponContext";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";
import { MaterialIcons } from "@expo/vector-icons";

const CouponCodeCard = (props: ICouponCodeCardProps) => {
  const couponContext = useContext(CouponContext);
  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);
  const [showAppliedCodePopup, setShowAppliedCodePopup] = useState<boolean>(
    false
  );
  const couponCode = props && props.couponCode;

  const onCopyCouponCodeClicked = (code: string) => {
    console.log("Clip", Clipboard);
    console.log("code", code);
    debugger;
    Clipboard.setString("hello");
    setIsTextCopied(true);
  };

  const onApplyCouponCodeClicked = (code: string) => {
    setShowAppliedCodePopup(true);
    couponContext.changeCode(code);
  };

  const onFindWorkspaceClicked = () => {
    // history.push("/home");
  };

  const createdAt = moment(couponCode.created_at, "YYYY-MM-DD").format(
    "DD MMMM YYYY"
  );

  const codeExpiresAt = moment(couponCode.expires_at, "YYYY-MM-DD").format(
    "DD MMMM YYYY"
  );

  const purchaseDetailsRow = (
    label: string,
    value: any,
    appendToValue: string = ""
  ) => {
    return (
      <View style={styles.purchaseDetailsRow}>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText style={defaultStyles.small}>{label}</CustomText>
        </View>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText
            style={{
              ...defaultStyles.small,
              fontFamily: "montserrat-semi-bold",
            }}
          >
            {appendToValue} {value}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {couponCode ? (
        <View>
          <View style={{ ...defaultStyles.container, ...styles.container }}>
            <View
              style={{
                width: "100%",
                marginBottom: 10,
              }}
            >
              <CustomText
                style={{
                  ...defaultStyles.littleSmall,
                  ...styles.text,
                  ...styles.daysText,
                }}
              >
                {createdAt}
              </CustomText>
            </View>
            <View style={styles.cardContainer}>
              <View>
                <Image
                  style={styles.workspaceImage}
                  source={{ uri: couponCode.image, width: 60, height: 60 }}
                />
              </View>
              <View style={styles.cardTextContainer}>
                <CustomText
                  style={{
                    ...defaultStyles.small,
                    ...styles.text,
                    fontFamily: "montserrat-semi-bold",
                  }}
                >
                  {couponCode.code}
                </CustomText>
                <CustomText
                  style={{
                    ...defaultStyles.extraSmall,
                    ...styles.text,
                    marginBottom: 10,
                  }}
                >
                  {couponCode.description}
                </CustomText>
              </View>
              <TouchableOpacity
                style={styles.forwardIconContainer}
                onPress={() => onCopyCouponCodeClicked(couponCode.code)}
              >
                <MaterialIcons name="content-copy" size={26} color="#707070" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                marginTop: 20,
                paddingBottom: 25,
                borderBottomWidth: 0.5,
                borderBottomColor: "#ccc",
              }}
            >
              {purchaseDetailsRow(
                "Coupon value",
                couponCode.discount_amount / 100,
                "&#8377;"
              )}
              {purchaseDetailsRow("Valid till", codeExpiresAt)}
              <CustomText
                style={{
                  ...defaultStyles.littleSmall,
                  marginTop: 20,
                  color: Colors.primary,
                  fontFamily: "montserrat-semi-bold",
                }}
                onPress={() => onApplyCouponCodeClicked(couponCode.code)}
              >
                APPLY THIS COUPON CODE
              </CustomText>
            </View>
          </View>

          {showAppliedCodePopup && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showAppliedCodePopup}
              onRequestClose={() => setShowAppliedCodePopup(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <CustomText
                    style={{ ...defaultStyles.h4Text, marginBottom: 15 }}
                  >
                    <Svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                      <G>
                        <Path
                          d="M67.2126 36.9326C66.9229 36.3398 66.9229 35.6601 67.2126 35.0675L69.8979 29.574C71.3931 26.5153 70.2084 22.8696 67.2011 21.2739L61.7997 18.408C61.2169 18.0989 60.8174 17.5488 60.7034 16.8992L59.647 10.8765C59.0588 7.52313 55.9569 5.26977 52.5865 5.74663L46.5323 6.60303C45.8788 6.69528 45.2326 6.48518 44.7586 6.02661L40.3639 1.77526C37.9169 -0.592008 34.0835 -0.592149 31.6366 1.77526L27.2419 6.02703C26.7677 6.48575 26.1215 6.69542 25.4682 6.60345L19.4139 5.74705C16.0424 5.26991 12.9416 7.52355 12.3534 10.8769L11.297 16.8994C11.183 17.5491 10.7835 18.0991 10.2009 18.4083L4.7995 21.2742C1.79211 22.8697 0.60749 26.5157 2.10261 29.5744L4.78783 35.0678C5.07751 35.6605 5.07751 36.3403 4.78783 36.9329L2.10247 42.4262C0.60735 45.4849 1.79197 49.1306 4.79936 50.7263L10.2007 53.5922C10.7835 53.9013 11.183 54.4514 11.297 55.1009L12.3534 61.1237C12.8889 64.1764 15.5065 66.3173 18.5149 66.317C18.8111 66.317 19.1118 66.2962 19.414 66.2534L25.4683 65.397C26.1212 65.3043 26.7678 65.5149 27.242 65.9734L31.6366 70.2248C32.8603 71.4086 34.43 72.0003 36.0002 72.0002C37.57 72 39.1406 71.4083 40.3638 70.2248L44.7586 65.9734C45.2327 65.5149 45.8791 65.3053 46.5323 65.397L52.5865 66.2534C55.9584 66.7304 59.0588 64.4769 59.647 61.1236L60.7035 55.1011C60.8176 54.4514 61.2171 53.9014 61.7997 53.5922L67.2011 50.7263C70.2084 49.1307 71.3931 45.4848 69.8979 42.4261L67.2126 36.9326ZM65.2547 47.0578L59.8533 49.9237C58.1312 50.8376 56.9501 52.463 56.6133 54.3833L55.5569 60.406C55.358 61.5405 54.3091 62.3026 53.1682 62.1416L47.1139 61.2852C45.1831 61.0116 43.2726 61.6331 41.8713 62.9885L37.4765 67.2398C36.6488 68.0405 35.3518 68.0405 34.5238 67.2398L30.1291 62.9884C28.9448 61.8427 27.3965 61.2219 25.7802 61.2219C25.484 61.2219 25.1855 61.2427 24.8865 61.285L18.8322 62.1414C17.6923 62.3026 16.6426 61.5404 16.4435 60.4058L15.387 54.383C15.05 52.4627 13.8691 50.8372 12.1468 49.9236L6.74545 47.0577C5.7279 46.5178 5.32712 45.2844 5.83294 44.2495L8.5183 38.756C9.37442 37.0044 9.37442 34.9955 8.5183 33.2439L5.83294 27.7504C5.32712 26.7155 5.7279 25.4821 6.74545 24.9422L12.1468 22.0763C13.8689 21.1624 15.05 19.5371 15.3868 17.6167L16.4432 11.5941C16.6423 10.4595 17.6911 9.69732 18.832 9.85848L24.8863 10.7149C26.8163 10.9881 28.7275 10.367 30.1289 9.0115L34.5237 4.76015C35.3514 3.95943 36.6483 3.95943 37.4763 4.76015L41.871 9.0115C43.2723 10.3671 45.1832 10.9881 47.1136 10.7149L53.1679 9.85848C54.3079 9.69718 55.3577 10.4595 55.5567 11.5941L56.613 17.6169C56.95 19.5372 58.1309 21.1627 59.8532 22.0763L65.2545 24.9422C66.2721 25.4821 66.6729 26.7155 66.167 27.7504L63.4817 33.2437C62.6256 34.9952 62.6256 37.0044 63.4817 38.7559L66.167 44.2492C66.673 45.2844 66.2722 46.5179 65.2547 47.0578Z"
                          fill="#61C6BB"
                        />
                        <Path
                          d="M51.1711 20.8287C50.3604 20.0178 49.0456 20.0178 48.2347 20.8287L20.8286 48.2349C20.0178 49.0458 20.0178 50.3605 20.8286 51.1713C21.234 51.5767 21.7655 51.7795 22.2967 51.7795C22.828 51.7795 23.3596 51.5769 23.7649 51.1713L51.171 23.7652C51.9821 22.9542 51.9821 21.6397 51.1711 20.8287Z"
                          fill="#61C6BB"
                        />
                        <Path
                          d="M27.6949 17.3131C23.497 17.3131 20.0816 20.7284 20.0816 24.9264C20.0816 29.1243 23.497 32.5396 27.6949 32.5396C31.8928 32.5396 35.3081 29.1243 35.3081 24.9264C35.3081 20.7284 31.8928 17.3131 27.6949 17.3131ZM27.6949 28.3868C25.7867 28.3868 24.2344 26.8345 24.2344 24.9262C24.2344 23.0181 25.7867 21.4657 27.6949 21.4657C29.603 21.4657 31.1555 23.0181 31.1555 24.9262C31.1553 26.8345 29.603 28.3868 27.6949 28.3868Z"
                          fill="#61C6BB"
                        />
                        <Path
                          d="M44.3052 39.4605C40.1073 39.4605 36.6919 42.8759 36.6919 47.0738C36.6919 51.2717 40.1073 54.687 44.3052 54.687C48.5031 54.687 51.9184 51.2717 51.9184 47.0738C51.9184 42.8759 48.5031 39.4605 44.3052 39.4605ZM44.3052 50.5343C42.3971 50.5343 40.8446 48.9819 40.8446 47.0738C40.8446 45.1657 42.3969 43.6133 44.3052 43.6133C46.2133 43.6133 47.7657 45.1657 47.7657 47.0738C47.7657 48.9819 46.2133 50.5343 44.3052 50.5343Z"
                          fill="#61C6BB"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0">
                          <rect width="72" height="72" fill="white" />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </CustomText>
                  <CustomText
                    style={{ ...defaultStyles.h3Text, marginBottom: 15 }}
                  >
                    Congratulations
                  </CustomText>
                  <CustomText style={defaultStyles.h3Text}>
                    &#8377;{couponCode.discount_amount / 100}
                  </CustomText>
                  <CustomText>
                    We have registered your request for a pdf invoice, it will
                    be sent your registered email id soon.
                  </CustomText>

                  {/* ----- Find Workspace Button ------ */}
                  <TouchableOpacity
                    onPress={onFindWorkspaceClicked}
                    style={{ width: "100%" }}
                  >
                    <View
                      style={{
                        ...commonAuthStyles.registerButtonContainer,
                        ...styles.buttonStyles,
                        justifyContent: "center",
                        marginLeft: 60,
                        marginRight: 60,
                        marginTop: 30,
                      }}
                    >
                      <CustomText
                        style={{
                          ...commonAuthStyles.registerButtonText,
                          ...defaultStyles.h6Text,
                          paddingHorizontal: 40,
                        }}
                      >
                        Find Workspace
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      ) : (
        <CustomText style={defaultStyles.h6Text}>Loading ... </CustomText>
      )}
    </View>
  );
};
export default CouponCodeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  cardTextContainer: {
    width: "80%",
    justifyContent: "space-around",
    marginLeft: 20,
  },
  daysText: {
    fontFamily: "montserrat-semi-bold",
    color: Colors.primary,
    alignSelf: "flex-start",
  },
  workspaceImage: {
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 30,
  },
  text: {
    color: "#202020",
    fontFamily: "montserrat-semi-bold",
  },
  forwardIconContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  purchaseDetailsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  purchaseDetailsColumn: {
    width: "40%",
    alignItems: "flex-start",
  },
  buttonStyles: {
    backgroundColor: Colors.primary,
    maxWidth: "100%",
  },
});
