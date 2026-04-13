import { useGeoCountry } from "./useGeoCountry";
import {
  getGeoCategory,
  SIGNUP_URL,
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

  return { url: SIGNUP_URL, label: "Sign up for free", category };
}
