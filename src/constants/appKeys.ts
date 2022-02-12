type KeysProps = {
  REACT_APP_BASE_URL: string
  REACT_APP_FRONT_BASE_URL: string
}

class Keys <KeysProps> {
  static REACT_APP_BASE_URL = process.env.REACT_APP_API_URL || "http://93.183.195.198:5006/api";
  static REACT_APP_FRONT_BASE_URL = process.env.REACT_APP_FRONT_BASE_URL || "http://93.183.195.198:5006";
}

export default Keys;
