import * as FireAdmin from "firebase-admin";
import firebaseConfig from "@repo/firebase-config";

FireAdmin.initializeApp(firebaseConfig);

export default FireAdmin;
