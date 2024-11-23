import ApiError from "../entities/ApiError";
import FireAdmin from "../config/firebaseConfig";
import { HTTP_CODE } from "../common/constant";

const db = FireAdmin.firestore();

export const fetchUser = async (userId: string) => {
  try {
    const userDoc = await db.collection("USERS").doc(userId).get();

    if (!userDoc.exists) {
      throw new ApiError(HTTP_CODE.NOT_FOUND, "User not found.");
    }

    return userDoc.data();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  data: Record<string, string>,
) => {
  try {
    await db.collection("USERS").doc(userId).update(data);

    const userDoc = await fetchUser(userId);

    return userDoc;
  } catch (error) {
    throw error;
  }
};
