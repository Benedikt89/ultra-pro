import {RolesType} from "../types/auth-types";
import {getPermits} from "./routes";
import {getSVGByKey} from "../assets/imageGetter";

export interface I_navigationItem {
  title: string
  icon: string | null
  path: string
  disabled: boolean
  expandable: Array<I_navigationItem> | null
  permits: RolesType[],
}

/* ====================
   navigation constants with path to locale, images and routes
 ==================== */

export const navigationOptions: Array<I_navigationItem> = [
  {
    title: "order", icon: getSVGByKey("iconTeam"), path: "/", disabled: false, expandable: [
      {
        title: "branches", icon: getSVGByKey("iconEnvoirment"), path: "/branches", disabled: false,
        expandable: null, permits: getPermits("branches")
      },
      {
        title: "users", icon: getSVGByKey("iconUser"), path: "/users", disabled: false,
        expandable: null, permits: getPermits("users")
      },
      {
        title: "services", icon: getSVGByKey("iconStar"), path: "/services", disabled: false,
        expandable: null, permits: getPermits("services")
      },
      {
        title: "calls", icon: getSVGByKey("iconFire"), path: "/calls", disabled: false,
        expandable: null, permits: getPermits("calls")
      },
      {
        title: "sound", icon: getSVGByKey("iconAudio"), path: "/sound", disabled: false,
        expandable: null, permits: getPermits("sound")
      },
      {
        title: "counters", icon: getSVGByKey("iconLockCircle"), path: "/counters", disabled: false,
        expandable: null, permits: getPermits("counters")
      },
    ],
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"]
  },
  {
    title: "quality", icon: getSVGByKey("iconSmile"), path: "/quality", disabled: false,
    expandable: null, permits: getPermits("quality")
  },
  {
    title: "pre_registration", icon: getSVGByKey("iconHistory"), path: "/pre-registration", disabled: false,
    expandable: null, permits: getPermits("pre")
  },
];
