import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Form, Item, Label, Input } from "native-base";
import { useMutation } from "@apollo/react-hooks";

import { Colors } from "../../AppCss";
import { IUserProfessionalDetailsProps } from "../../ts-types";
import { UPDATE_USER_PROFESSIONAL_DETAILS } from "../../mutations";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";

const UserProfessionalDetails = (props: IUserProfessionalDetailsProps) => {
  const userProfessionalDetails =
    props && props.details && props.details.userProfessionalDetails;

  const [formValues, setFormValues] = useState<any>({
    designation: userProfessionalDetails && userProfessionalDetails.designation,
    organization:
      userProfessionalDetails && userProfessionalDetails.organization,
    industry: userProfessionalDetails && userProfessionalDetails.industry,
    education: userProfessionalDetails && userProfessionalDetails.education,
    description: userProfessionalDetails && userProfessionalDetails.description,
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [focussedItem, setFocussedItem] = useState<string | null>(null);

  const [updateUserProfessionalDetails, {}] = useMutation(
    UPDATE_USER_PROFESSIONAL_DETAILS
  );

  const onInputFocusListener = (field: string) => {
    setFocussedItem(field);
  };

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const onCancelUpdate = () => {
    setFormValues(
      props && props.details && props.details.userProfessionalDetails
    );
  };

  const onProfessionalDetailsFormSubmitListener = () => {
    try {
      updateUserProfessionalDetails({
        variables: { ...formValues },
      })
        .then(() => {
          showToastBox(
            "Your Professional Details have been successfully updated"
          );
        })
        .catch(() => {
          showToastBox(
            "Please check your email and phone number and try again"
          );
        });
    } catch {
      showToastBox("Something went wrong .. Please try again later");
    }
  };

  return (
    <View style={styles.container}>
      <Form>
        {/* ----- Designation ------ */}
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "designation"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            Designation
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, designation: val })
            }
            onFocus={() => onInputFocusListener("designation")}
            value={formValues.designation}
          />
        </Item>

        {/* ----- Organization ------ */}
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "organization"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            Organization
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, organization: val })
            }
            onFocus={() => onInputFocusListener("organization")}
            value={formValues.organization}
          />
        </Item>

        {/* ----- Industry ------ */}
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "industry"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            Industry
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, industry: val })
            }
            onFocus={() => onInputFocusListener("industry")}
            value={formValues.industry}
          />
        </Item>

        {/* ----- Education ------ */}
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "education"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            Education
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, education: val })
            }
            onFocus={() => onInputFocusListener("education")}
            value={formValues.education}
          />
        </Item>

        {/* ----- Description ------ */}
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "description"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            Description
          </Label>
          <Input
            onChangeText={(val) =>
              setFormValues({ ...formValues, description: val })
            }
            onFocus={() => onInputFocusListener("description")}
            value={formValues.description}
          />
        </Item>
      </Form>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {/* ----- Clear Button ------ */}
        <TouchableOpacity onPress={onCancelUpdate}>
          <View style={commonAuthStyles.registerButtonContainer}>
            <Text
              style={{
                ...commonAuthStyles.registerButtonText,
                paddingHorizontal: 10,
              }}
            >
              CLEAR
            </Text>
          </View>
        </TouchableOpacity>

        {/* ----- Save Button ------ */}
        <TouchableOpacity onPress={onProfessionalDetailsFormSubmitListener}>
          <View
            style={{
              ...commonAuthStyles.registerButtonContainer,
            }}
          >
            <Text
              style={{
                ...commonAuthStyles.registerButtonText,
                paddingHorizontal: 10,
              }}
            >
              SAVE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserProfessionalDetails;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flex: 1,
    marginLeft: "4%",
  },
});
