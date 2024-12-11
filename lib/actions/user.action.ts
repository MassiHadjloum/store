"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { Session } from "inspector/promises";

const getUserByEmail = async (email: string) => {
  console.log("resu db ");
  const { databases } = await createAdminClient();
  console.log("resu db ", databases);
  const results = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );
  console.log("resu db ", results);
  return results.total > 0 ? results.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Faild to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  console.log(":::: merdeeeee ");
  const exestingUser = await getUserByEmail(email);
  console.log(":::: ", exestingUser);
  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send OTP");
  if (!exestingUser) {
    const { databases } = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar:
          "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
        accountId,
      }
    );
  }
  return parseStringify({ accountId });
};

export const verifySecret = async (accountId: string, password: string) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return parseStringify({sessionId: session.$id})
  } catch (err) {
    handleError(err, "Failed to verify OTP");
  }
};
