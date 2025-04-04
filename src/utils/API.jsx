import axios from "axios";
import Swal from "sweetalert2";

export async function GetData(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function PostData(url, payload) {
  try {
    await axios.post(url, payload);
  } catch (e) {
    console.error(e);
  }
}

export async function DeleteData(url, id) {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (e) {
    console.error(e);
  }
}