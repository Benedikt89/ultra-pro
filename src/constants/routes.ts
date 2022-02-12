import {RolesType} from "../types/auth-types";
import {hasOwnProperty} from "../types/typeHelpers";


export interface RouteType {
  path: string,
  free: boolean,
  permits: RolesType[],
}

/* ====================
    manage app routes and permits by user role
 ==================== */

type Routes = {[key: string]: RouteType}

export const routes:Routes = {
  "login": {
    path: "/login",
    free: true,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_INSPECTOR"],
  },
  "profile": {
    path: "/profile",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_OPERATOR", "ROLE_INSPECTOR"],
  },
  "branches": {
    path: "/branches",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  "users": {
    path: "/users",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  "services": {
    path: "/services",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  "calls": {
    path: "/calls",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  "counters": {
    path: "/counters",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  "sound": {
    path: "/sound",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  "quality": {
    path: "/quality",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
  "pre": {
    path: "/pre-registration",
    free: false,
    permits: ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"],
  },
};

export const getRoute = (key: string):RouteType => {
  if (hasOwnProperty(routes, key)) {
    return routes[key] as RouteType
  } else {
    return {
      path: "/",
      free: true,
      permits: []
    }
  }
};

export const getPermits = (key: string): RolesType[] => {
  let route = getRoute(key);
  return route.permits;
};