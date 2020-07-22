import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Modal } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
  Icon,
} from "native-base";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { GET_INVOICE } from "../../queries";
import { REQUEST_INVOICE_PDF } from "../../mutations";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";
import { ForwardArrowIcon } from "../../icons";
import { CustomText } from "../../components/ui/CustomText";
import { Ionicons, Entypo } from "@expo/vector-icons";
import defaultStyles, { Colors } from "../../AppCss";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const PurchaseDetailsScreen = (props: any) => {
  const [showCompanyInput, setShowCompanyInput] = useState<boolean>(false);
  const [showGSTInput, setShowGSTInput] = useState<boolean>(false);
  const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
  const [focussedItem, setFocussedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { loading, error, data } = useQuery(GET_INVOICE, {
    variables: {
      payment_id: +props.route.params.id,
    },
  });

  const invoice = data && data.invoice;
  const payment = invoice && invoice.payment;
  const totalPayment = payment && (+payment.amount + +payment.gst) / 100;
  const subscription = payment && payment.subscription;
  const subscriptionStartDate = moment(
    subscription && subscription.start_date,
    "YYYY-MM-DD"
  ).format("DD MMMM");
  const subscriptionEndDate = moment(
    subscription && subscription.end_date,
    "YYYY-MM-DD"
  ).format("DD MMMM YYYY");
  const user = payment && payment.user;
  const plan = payment && payment.plan;
  const workspace = plan && plan.workspace;
  const workspaceName = workspace && workspace.name;
  const firstImage =
    workspace &&
    workspace.images &&
    workspace.images[0] &&
    workspace.images[0].image_url;
  const shortAddress =
    workspace &&
    workspace.addresses &&
    workspace.addresses[0] &&
    workspace.addresses[0].short_address;

  const [formValues, setFormValues] = useState<any>({
    company: invoice && invoice.company,
    gstNumber: invoice && invoice.gst_number,
    address: invoice && invoice.address,
  });

  useEffect(() => {
    setFormValues({
      company: invoice && invoice.company,
      gstNumber: invoice && invoice.gst_number,
      address: invoice && invoice.address,
    });
  }, [invoice]);

  const [showRequestSuccessPopup, setShowRequestSuccessPopup] = useState<
    boolean
  >(false);

  const [requestInvoicePDF, {}] = useMutation(REQUEST_INVOICE_PDF);

  const onInputFocusListener = (field: string) => {
    if (field === "company") {
      setShowGSTInput(false);
      setShowAddressInput(false);
    } else if (field === "gst") {
      setShowCompanyInput(false);
      setShowAddressInput(false);
    } else if (field === "address") {
      setShowCompanyInput(false);
      setShowGSTInput(false);
    }
  };

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const showCompany = () => {
    if (showCompanyInput) {
      return (
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "company"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            Company
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, company: val })
            }
            onFocus={() => onInputFocusListener("company")}
            onBlur={() => setShowCompanyInput(false)}
          />
        </Item>
      );
    } else {
      return (
        <View style={{ ...styles.formContainer, marginTop: 10 }}>
          <View>
            <CustomText style={defaultStyles.small}>Company</CustomText>
          </View>
          <CustomText
            style={{ ...defaultStyles.small, fontFamily: "montserrat-bold" }}
          >
            {(formValues && formValues.company) || (invoice && invoice.company)}
          </CustomText>
          <Entypo
            name="edit"
            size={20}
            color="black"
            onPress={() => setShowCompanyInput(true)}
          />
        </View>
      );
    }
  };

  const showGST = () => {
    if (showGSTInput) {
      return (
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "gst"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            GST Number
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, gstNumber: val })
            }
            onFocus={() => onInputFocusListener("gst")}
            onBlur={() => setShowGSTInput(false)}
          />
        </Item>
      );
    } else {
      return (
        <View style={styles.formContainer}>
          <View>
            <CustomText style={defaultStyles.small}>GST Number</CustomText>
          </View>
          <CustomText
            style={{ ...defaultStyles.small, fontFamily: "montserrat-bold" }}
          >
            {(formValues && formValues.gstNumber) ||
              (invoice && invoice.gst_number)}
          </CustomText>
          <Entypo
            name="edit"
            size={20}
            color="black"
            onPress={() => setShowGSTInput(true)}
          />
        </View>
      );
    }
  };

  const showAddress = () => {
    if (showAddressInput) {
      return (
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "address"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            Address
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, address: val })
            }
            onFocus={() => onInputFocusListener("address")}
            onBlur={() => setShowAddressInput(false)}
          />
        </Item>
      );
    } else {
      return (
        <View style={styles.formContainer}>
          <View>
            <CustomText style={defaultStyles.small}>Address</CustomText>
          </View>
          <CustomText
            style={{ ...defaultStyles.small, fontFamily: "montserrat-bold" }}
          >
            {(formValues && formValues.address) || (invoice && invoice.address)}
          </CustomText>
          <Entypo
            name="edit"
            size={20}
            color="black"
            onPress={() => setShowAddressInput(true)}
          />
        </View>
      );
    }
  };

  const onRequestPDFClicked = () => {
    try {
      requestInvoicePDF({
        variables: {
          paymentId: +props.route.params.id,
          ...formValues,
        },
      })
        .then((data) => {
          showToastBox(
            "Request Received .. you will receive your invoice within 24 hours"
          );
          setShowRequestSuccessPopup(true);
        })
        .catch((e) => {
          showToastBox("Something went wrong .. please try again later");
        });
    } catch (e) {
      showToastBox("Something went wrong .. please try again later");
    }
  };

  const onPurchaseAgainClicked = () => {
    props.navigation.navigate("WorkspaceDetails", {
      id: workspace && workspace.id,
    });
  };

  const purchaseDetailsRow = (label: string, value: any) => {
    return (
      <View style={styles.purchaseDetailsRow}>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText style={defaultStyles.small}>{label}</CustomText>
        </View>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText
            style={{ ...defaultStyles.small, fontFamily: "montserrat-bold" }}
          >
            {value}
          </CustomText>
        </View>
      </View>
    );
  };

  const changeState = (key: string, value: any) => {
    if (key === "company") {
      setShowCompanyInput(value);
    } else if (key === "gst") {
      setShowGSTInput(value);
    } else if (key === "address") {
      setShowAddressInput(value);
    }
  };

  const invoiceCreatedAt = moment(
    invoice && invoice.created_at,
    "YYYY-MM-DD"
  ).format("DD MMMM YYYY");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.purchaseDetailsContainer}>
        {purchaseDetailsRow("Purchase Details", invoiceCreatedAt)}
        {purchaseDetailsRow("Invoice #", invoice && invoice.id)}
        {purchaseDetailsRow("Total Amount", totalPayment)}
      </View>
      <View style={styles.planContainer}>
        <View style={styles.cardContainer}>
          <View style={{ alignSelf: "center" }}>
            <Image
              style={styles.workspaceImage}
              source={{ uri: firstImage, width: 50, height: 50 }}
            />
          </View>
          <View style={styles.cardTextContainer}>
            <CustomText
              style={{
                ...defaultStyles.small,
                ...styles.text,
                fontFamily: "montserrat-bold",
              }}
            >
              {workspaceName}
            </CustomText>
            <CustomText style={{ ...defaultStyles.extraSmall, ...styles.text }}>
              {shortAddress}
            </CustomText>
          </View>
        </View>
        <View style={styles.cardBottomBorder} />
        <View style={{ marginVertical: 10 }}>
          {purchaseDetailsRow("Package", plan && plan.location_type)}
          {purchaseDetailsRow("Package Type", plan && plan.space_type)}
          {purchaseDetailsRow("Duration", plan && plan.title)}
          {purchaseDetailsRow(
            "Date",
            `${subscriptionStartDate} to ${subscriptionEndDate}`
          )}
          {purchaseDetailsRow(
            "Number of Seats",
            payment && payment.number_of_seats
          )}
        </View>
      </View>
      <CustomText style={{ ...defaultStyles.h4Text, marginTop: 30 }}>
        Payment Information
      </CustomText>
      <View style={styles.billingDetailsContainer}>
        <CustomText
          style={{
            ...defaultStyles.h6Text,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          BILLING DETAILS
        </CustomText>
        {purchaseDetailsRow("Name", user && user.name)}

        {/* Company Input */}
        <View>{showCompany()}</View>

        {/* GST number */}
        <View>{showGST()}</View>

        {/* Address */}
        <View>{showAddress()}</View>
      </View>

      <View style={styles.buttonsContainer}>
        {/* ----- Request PDF Button ------ */}
        <TouchableOpacity onPress={onRequestPDFClicked}>
          <View
            style={{
              ...commonAuthStyles.registerButtonContainer,
              ...styles.buttonStyles,
              marginLeft: 0,
            }}
          >
            <CustomText
              style={{
                ...commonAuthStyles.registerButtonText,
                ...defaultStyles.h6Text,
                width: 100,
              }}
            >
              Request a PDF
            </CustomText>
          </View>
        </TouchableOpacity>

        {/* ----- Purchase Again Button ------ */}
        <TouchableOpacity onPress={onPurchaseAgainClicked}>
          <View
            style={{
              ...commonAuthStyles.registerButtonContainer,
              ...styles.buttonStyles,
              marginLeft: 50,
            }}
          >
            <CustomText
              style={{
                ...commonAuthStyles.registerButtonText,
                ...defaultStyles.h6Text,
                width: 120,
              }}
            >
              Purchase Again
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
      {showRequestSuccessPopup && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showRequestSuccessPopup}
          onRequestClose={() => setShowRequestSuccessPopup(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CustomText style={{ ...defaultStyles.h4Text, marginBottom: 15 }}>
                <Entypo name="thumbs-up" size={32} color={Colors.primary} />
              </CustomText>
              <CustomText style={{ ...defaultStyles.h3Text, marginBottom: 15 }}>
                Request Confirmed
              </CustomText>
              <CustomText>
                We have registered your request for a pdf invoice, it will be
                sent your registered email id soon.
              </CustomText>
              {/* ----- Purchase Again Button ------ */}
              <TouchableOpacity
                onPress={() => setShowRequestSuccessPopup(false)}
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
                    Thanks
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};
export default PurchaseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  purchaseDetailsContainer: {
    width: "80%",
    marginTop: 25,
    marginBottom: 20,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  purchaseDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  purchaseDetailsColumn: {
    width: "50%",
    alignItems: "flex-start",
  },
  planContainer: {
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  cardContainer: {
    width: "80%",
    height: 55,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottomBorder: {
    width: "100%",
    height: 1,
    textAlign: "center",
    backgroundColor: "#ccc",
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  workspaceImage: {
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 25,
  },
  text: {
    color: "#202020",
    marginBottom: 5,
  },
  billingDetailsContainer: {
    width: "80%",
    marginTop: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  formContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -10,
    marginBottom: 20,
  },
  buttonStyles: {
    backgroundColor: Colors.primary,
    maxWidth: "100%",
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
});
