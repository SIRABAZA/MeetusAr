export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_URL || "https://api-yeshtery.dev.meetusvr.com",
  ENDPOINTS: {
    LOGIN: "/v1/yeshtery/token",
    USER_INFO: "/v1/user/info",
  },
  TIMEOUT: 10000,
};

export const APP_CONFIG = {
  APP_NAME: "MeetUs VR",
  VERSION: "1.0.0",
};
