import axios from "axios";
import { Market } from "../Types/Market";

export const getSupermarkets = async (): Promise<Market[]> => {
  const res = await axios.get<Market[]>("https://localhost:7226/getAllMarket");
  return res.data;
};
export type { Market };
