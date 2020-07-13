import Validations from "./validations";

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
      console.log("formValues", formValues[inputField]);
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
