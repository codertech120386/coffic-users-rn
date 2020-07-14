export const FILTERS = [
  "Property type",
  "Space type",
  "Amenities",
  "Duration & Price",
  "Distance",
  "Seat Capacity",
];

export const DURATIONS = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quaterly",
  "Half Yearly",
  "Yearly",
];

export const PROPERTY_TYPE_CHECKBOX_LIST = [];

export const SPACE_TYPE_CHECKBOX_LIST = [
  {
    val: "Open Desk",
    displayName: "Open Desk",
    isChecked: false,
  },
  {
    val: "Private Cabin",
    displayName: "Private Cabin",
    isChecked: false,
  },
  {
    val: "Meeting Room",
    displayName: "Meeting Room",
    isChecked: false,
  },
  {
    val: "Training Space",
    displayName: "Training Space",
    isChecked: false,
  },
  {
    val: "Semi-Private Cubical",
    displayName: "Semi-Private Cubical",
    isChecked: false,
  },
  {
    val: "Event Space",
    displayName: "Event Space",
    isChecked: false,
  },
  {
    val: "Virtual Office Address",
    displayName: "Virtual Office Address",
    isChecked: false,
  },
];

export const INITIAL_WORKSPACE_FILTER_LIST = {
  propertyType: PROPERTY_TYPE_CHECKBOX_LIST,
  spaceType: SPACE_TYPE_CHECKBOX_LIST,
  amenities: [],
  amenitiesQueried: false,
  propertyTypesQueried: false,
  duration: null,
  price: null,
  distance: null,
  seatCapacity: null,
};

export const password =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export const GENDERS = ["male", "female", "others"];
