import axios from "axios";

export const ReturnError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response;
  } else {
    return {
      status: 500
    }
  };
}