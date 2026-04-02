import { useGeoCountry } from "./useGeoCountry";
import {
  getGeoCategory,
  SIGNUP_URL,
  REQUEST_TRIAL_URL,
  type GeoCategory,
} from "@/data/geo-categories";

interface SignupUrlResult {
  url: string;
  label: string;
  category: GeoCategory;
}

export function useSignupUrl(): SignupUrlResult {
  const { rawCountry } = useGeoCountry();
  const category = getGeoCategory(rawCountry);

  switch (category) {
    case "A":
      return { url: SIGNUP_URL, label: "Sign up for free", category };
    case "B":
      return { url: REQUEST_TRIAL_URL, label: "Request a trial", category };
    case "unsupported":
      return { url: REQUEST_TRIAL_URL, label: "Request a trial", category };
  }
}
