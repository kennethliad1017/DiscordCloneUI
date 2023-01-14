import { createIconSet } from "@expo/vector-icons";
import font from "../../assets/fonts/MaterialSymbolsRounded.ttf";
import glyphMap from "./icon.json";

const MdsIcon = createIconSet(glyphMap, "material-symbols-rounded", font);

export default MdsIcon;
