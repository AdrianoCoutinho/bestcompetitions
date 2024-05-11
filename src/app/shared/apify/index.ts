import axios from "axios";
import { apifyEnv } from "../../envs/apify.env";

axios.defaults.baseURL = apifyEnv.secret;

export interface ApiResponse {
  ok: boolean;
  data?: any;
  message: string;
  code?: number;
  msg?: string;
}

export const getTiktokVideo = async (url: string): Promise<any> => {
  try {
    const data = {
      postURLs: [url],
      resultsPerPage: 1,
      shouldDownloadCovers: false,
      shouldDownloadSlideshowImages: false,
      shouldDownloadSubtitles: false,
      shouldDownloadVideos: false,
    };
    const result = await axios.post("", data);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const verifyTiktokUser = async (url: string): Promise<any> => {
  try {
    const data = {
      postURLs: [url],
      resultsPerPage: 1,
      shouldDownloadCovers: false,
      shouldDownloadSlideshowImages: false,
      shouldDownloadSubtitles: false,
      shouldDownloadVideos: false,
    };
    const result = await axios.post("", data);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const getView = async (url: string): Promise<any> => {
  try {
    const data = {
      postURLs: [url],
      resultsPerPage: 1,
      shouldDownloadCovers: false,
      shouldDownloadSlideshowImages: false,
      shouldDownloadSubtitles: false,
      shouldDownloadVideos: false,
    };
    const result = await axios.post("", data);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};
