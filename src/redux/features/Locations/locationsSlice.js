import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api";

const getLocationDitails = async (locationId) => {
  const response = await api.get(`/location-ditails?locationId=${locationId}`);
  const [locationDitails] = response.data;
  return locationDitails ? locationDitails : {};
};

export const getLocatiosnWithDitails = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    const { data } = await api.get("/locations");
    const currentLocation = data.map((item) => getLocationDitails(item.id));
    const newCollection = await Promise.all(currentLocation);

    const newLocations = data.map((location, index) => {
      return { ...location, ditails: newCollection[index] };
    });

    return newLocations;
  }
);

export const getLocationWithDitails = createAsyncThunk(
  "location/fetchLocationById",
  async (locationId) => {
    const { data } = await api.get(`/locations?id=${locationId}`);
    const result = await getLocationDitails(locationId);

    return { ...data[0], ditails: result.ditails };
  }
);

const initialState = {
  locations: [],
  location: null,
  loading: "idle",
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocatiosnWithDitails.fulfilled, (state, action) => {
      state.locations = action.payload;
    });
    builder.addCase(getLocationWithDitails.fulfilled, (state, action) => {
      state.location = action.payload;
    });
  },
});

export default locationsSlice.reducer;
