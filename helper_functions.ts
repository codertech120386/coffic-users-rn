import Validations from "./validations";
import { AsyncStorage } from "react-native";

export const convertTimeTo12HourFormat = (time: string) => {
  const timeArray = time.split(":");
  if (+timeArray[0] < 12) {
    return `${timeArray[0]}:${timeArray[1]} AM`;
  } else {
    const hours = +timeArray[0] - 12;
    return `${hours}:${timeArray[1]} PM`;
  }
};

export const validateInputs = (inputObject: any, formValues: any) => {
  let isValid: boolean = true;
  let errors: any = Object.create(null);

  Object.keys(inputObject).map((inputField) => {
    errors[inputField] = [];
    inputObject[inputField].map((arg: any) => {
      const argsArray = arg.split(":");
      const functionName = argsArray[0];
      const [result, message] = Validations[functionName](
        formValues[inputField],
        inputField,
        argsArray
      );
      if (!result) {
        isValid = false;
        errors[inputField].push(message);
      }
    });
  });
  return [isValid, errors];
};

export const setObject = async (key: string, object: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(object));
};

export const setItem = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, value);
};

export const getItem = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
