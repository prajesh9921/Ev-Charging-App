import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 1; // Adjust as needed for zoom level
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;