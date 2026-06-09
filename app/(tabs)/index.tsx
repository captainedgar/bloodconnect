import { Platform } from "react-native";
import WebMap from "@/components/map/WebMap";

export default function MapTab() {
  if (Platform.OS === "web") {
    return <WebMap />;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const MobileMap = require("@/components/map/MobileMap").default;
  return <MobileMap />;
}
