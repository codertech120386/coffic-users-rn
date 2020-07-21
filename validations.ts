const validations = {
  required: (value: any, field: any, args: any) => {
    if (value.trim().length > 0) {
      return [true, null];
    }
    return [false, `${field} is required`];
  },
  matchLength: (value: string, field: string, args: any[]) => {
    const length = args[1];
    const unit = args[2];
    if (value.trim().length == length) {
      return [true, null];
    }
    return [false, `${field} should be exactly ${length} ${unit} long`];
  },
  minLength: (value: string, field: string, args: any[]) => {
    const length = args[1];
    const unit = args[2];
    if (value.trim().length >= length) {
      return [true, null];
    }
    return [false, `${field} should be at least ${length} ${unit} long`];
  },
  maxLength: (value: string, field: string, args: any[]) => {
    const length = args[1];
    const unit = args[2];
    if (value.trim().length <= length) {
      return [true, null];
    }
    return [false, `${field} should be less than ${length} ${unit}`];
  },
  email: (email: string, field: string, args) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return [true, null];
    }
    return [false, "Please enter a valid email"];
  },
};

export default validations;
