import API from "@/utils/axiosConfig";
import { AppDispatch } from "../store"; // Import AppDispatch từ store
import {
  getAllVegetableSuccess,
  getAllVegetableFailure,
  getAllVegetableStart,
  addVegetableStart,
  addVegetableSuccess,
  addVegetableFailure,
  detailVegetableStart,
  detailVegetableSuccess,
  detailVegetableFailure,
  updateVegetableStart,
  updateVegetableSuccess,
  updateVegetableFailure,
  deleteVegetableStart,
  deleteVegetableSuccess,
  deleteVegetableFailure,
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
export const detailVegetable = async (dispatch: AppDispatch, id: string) => {
  dispatch(detailVegetableStart());
  try {
    const res = await API.get(`/v1/detailsVegatable/${id}`);
    console.log(res, "resssss");
    dispatch(detailVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(detailVegetableFailure((error as Error).message));
  }
};
export const updateVegetable = async (
  dispatch: AppDispatch,
  payload: Vegetable,
  id: string
) => {
  dispatch(updateVegetableStart());
  try {
    const res = await API.post(`/v1/updateVegatable/${id}`, payload);
    dispatch(updateVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(updateVegetableFailure((error as Error).message));
  }
};
export const delleteVegetable = async (dispatch: AppDispatch, id: string) => {
  dispatch(deleteVegetableStart());
  try {
    const res = await API.delete(`/v1/deleteVegatable/${id}`);
    dispatch(deleteVegetableSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(deleteVegetableFailure((error as Error).message));
  }
};
