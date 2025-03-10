import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
  getAllVegetableSuccess,
  getAllVegetableFailure,
  getAllVegetableStart,
  addVegetableStart,
  addVegetableSuccess,
  addVegetableFailure,
} from "./vegatableslice";
interface Vegetable {
  name: string;
  price: number;
  content: string;
  number: number;
  unit: string;
  supplier: string;
}
export const getAllvegetale = async (dispatch: AppDispatch, params: string) => {
  dispatch(getAllVegetableStart());
  try {
    console.log(params, "111111111");
    const res = await API.get(`/v1/vegatable${params}`);
    dispatch(getAllVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getAllVegetableFailure((error as Error).message));
  }
};
export const addVegetable = async (
  dispatch: AppDispatch,
  payload: Vegetable
) => {
  dispatch(addVegetableStart());
  try {
    const res = await API.post("/v1/addVegatable", payload);
    dispatch(addVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(addVegetableFailure((error as Error).message));
  }
};
