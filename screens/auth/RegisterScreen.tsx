import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Container, Content, Form, Item, Label, Input } from "native-base";

import { CustomText } from "../../components/ui/CustomText";

import defaultStyles from "../../AppCss";

export default function RegisterScreen() {
  return (
    <Container>
      <Content style={{ paddingHorizontal: 20 }}>
        <Form>
          <Item floatingLabel>
            <Label style={styles.floatingLabel}>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.floatingLabel}>Password</Label>
            <Input />
          </Item>
        </Form>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <CustomText>
            Already have an account?{" "}
            <Text style={defaultStyles.link}>Log in</Text>
          </CustomText>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  floatingLabel: {
    fontFamily: "montserrat",
  },
});
