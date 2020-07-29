import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/react-hooks";

import { UPDATE_USER_PERSONAL_DETAILS } from "../../mutations";
import { Item, Label, Input, Form } from "native-base";

import { CustomText } from "../ui/CustomText";

import { IUserProfessionalDetailsProps } from "../../ts-types";
import { validateInputs } from "../../helper_functions";
import defaultStyles, { Colors } from "../../AppCss";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";
import GenderRadioButton from "../ui/GenderRadioButton";

import { GENDERS, FONTSTYLES } from "../../constants";

const UserPersonalDetails = (props: IUserProfessionalDetailsProps) => {
  const userPersonalDetails =
    props && props.details && props.details.userPersonalDetails;

  const [formValues, setFormValues] = useState<any>({
    name: userPersonalDetails && userPersonalDetails.name,
    gender: userPersonalDetails && userPersonalDetails.gender,
    phone:
      userPersonalDetails &&
      userPersonalDetails.phone &&
      userPersonalDetails.phone.slice(2),
    email: userPersonalDetails && userPersonalDetails.email,
  });
  const [selectedGenderId, setSelectedGenderId] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<any>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [focussedItem, setFocussedItem] = useState<string | null>(null);

  const [updateUserPersonalDetails, {}] = useMutation(
    UPDATE_USER_PERSONAL_DETAILS
  );

  const onInputFocusListener = (field: string) => {
    const oldErrors: any = { ...validationErrors };
    delete oldErrors[field];
    setValidationErrors(oldErrors);
    setFocussedItem(field);
  };

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const radioChangeListener = (gender: string) => {
    setFormValues({ ...formValues, gender });
    const selectedGender = GENDERS.filter(
      (genderObj) => genderObj.type === gender
    );

    setSelectedGenderId(selectedGender[0].id);
  };

  const displayRadioButton = (gender: string) => {
    return (
      <View
        style={{
          width: "30%",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginTop: 15,
          marginLeft: "5%",
          height: 45,
        }}
        key={gender}
      >
        <GenderRadioButton
          isSelectedProp={formValues && formValues.gender}
          item={gender}
          radioChanged={radioChangeListener}
        />

        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            alignItems: "center",
          }}
        >
          <CustomText
            style={{
              ...defaultStyles.h6Text,
              fontFamily: FONTSTYLES.normal,
            }}
          >
            {gender}
          </CustomText>
        </View>
      </View>
    );
  };

  const onCancelUpdate = () => {
    setFormValues(props && props.details && props.details.userPersonalDetails);
  };

  const onPersonalDetailsFormSubmitListener = () => {
    const newPhone =
      formValues && formValues.phone && formValues.phone.length === 10
        ? `91${formValues.phone}`
        : formValues.phone;

    setFormValues({ ...formValues, phone: newPhone });

    const [isValid, errors] = validateInputs(
      {
        name: ["required", "maxLength:50:characters"],
        phone: ["required", "minLength:10:digits"],
      },
      formValues
    );

    if (isValid) {
      try {
        updateUserPersonalDetails({
          variables: {
            ...formValues,
            phone: newPhone,
          },
        });
        setFormValues({ ...formValues, phone: newPhone.slice(2) });
        showToastBox("Your Personal Details have been successfully updated");
      } catch {
        showToastBox("Something went wrong .. Please try again later");
      }
    } else {
      setValidationErrors(errors);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Form>
        {/* ----- Name ------ */}
        <Item floatingLabel>
          <Label
            style={
              focussedItem === "name"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            NAME
          </Label>
          <Input
            onChangeText={(val: any) =>
              setFormValues({ ...formValues, name: val })
            }
            onFocus={() => onInputFocusListener("name")}
            value={formValues.name}
          />
        </Item>

        {validationErrors &&
          validationErrors["name"] &&
          validationErrors["name"].length > 0 && (
            <Text
              style={{
                ...defaultStyles.danger,
                ...defaultStyles.dangerItalic,
                ...commonAuthStyles.errorText,
              }}
            >
              {validationErrors["name"].join(" and ")}
            </Text>
          )}

        <CustomText
          style={{
            ...commonAuthStyles.floatingLabel,
            marginTop: 15,
            marginBottom: -15,
            marginLeft: 15,
            ...defaultStyles.littleSmall,
            color: "grey",
            fontFamily: FONTSTYLES.semiBold,
          }}
        >
          GENDER
        </CustomText>
        <View style={{ flexDirection: "row" }}>
          {GENDERS.map((genderObj: { id: number; type: string }) =>
            displayRadioButton(genderObj.type)
          )}
        </View>

        {/* ----- Phone Number ------ */}
        <Item floatingLabel last>
          <Label
            style={
              focussedItem === "phone"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            PHONE NUMBER
          </Label>
          <Input
            keyboardType="phone-pad"
            onChangeText={(val) => setFormValues({ ...formValues, phone: val })}
            onFocus={() => onInputFocusListener("phone")}
            value={formValues.phone}
          />
        </Item>

        {validationErrors &&
          validationErrors["phone"] &&
          validationErrors["phone"].length > 0 && (
            <Text
              style={{
                ...defaultStyles.danger,
                ...defaultStyles.dangerItalic,
                ...commonAuthStyles.errorText,
              }}
            >
              {validationErrors["phone"].join(" and ")}
            </Text>
          )}

        {/* ----- Email ------ */}
        <Item floatingLabel last>
          <Label
            style={
              focussedItem === "email"
                ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                : commonAuthStyles.floatingLabel
            }
          >
            EMAIL
          </Label>
          <Input
            keyboardType="email-address"
            onFocus={() => onInputFocusListener("email")}
            value={formValues.email}
            disabled={true}
            style={{ color: Colors.disabled }}
          />
        </Item>

        {validationErrors &&
          validationErrors["email"] &&
          validationErrors["email"].length > 0 && (
            <Text
              style={{
                ...defaultStyles.danger,
                ...defaultStyles.dangerItalic,
                ...commonAuthStyles.errorText,
              }}
            >
              {validationErrors["email"].join(" and ")}
            </Text>
          )}
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
        <TouchableOpacity onPress={onPersonalDetailsFormSubmitListener}>
          <View style={commonAuthStyles.registerButtonContainer}>
            <Text
              style={{
                ...commonAuthStyles.registerButtonText,
                paddingHorizontal: 15,
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
export default UserPersonalDetails;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flex: 1,
    marginLeft: "4%",
  },
});
