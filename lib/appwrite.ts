import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Storage,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setPlatform(config.platform)
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!);

export const avater = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const login = async () => {
  try {
    // هنا انشاءت متغير بيحمل مسار الصفحه الي المستخدم هيروحها لو عمل تسجيل دخول ناجح
    const redirectUrl = Linking.createURL("/");

    // هنا بنشاء جلسه عشان اربط تطبيقي بطريقه تسجيل الدخول من جوجل وفي وبضيف فيها المسار الي المستخدم مفروض هيروحوا 
    // بعد نجاح الجلسه
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUrl
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    // هنا لو جلسه الربط نجحت بيفتح ليا نافذها بيها اختيار تسجيل الدخول باستخدام جوجل
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUrl
    );
    if (browserResult.type !== "success")
      throw new Error("Open OAuth2 Session Async failed");

    // url بعدها بحول الينك بتاع تسجيل الدخول الي  
    // عشان اقدر اخد منه بيانات المستخدم والباسورد
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("secret and userId failed");

    // بعدها بانشاء جلسه دخول علي تطبيقي بي بيانات المستخدم عشان كل ما يدخل التطبيق يبقا شغال ومسجل دخول
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = async () => {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (user.$id) {
      const userAvatar = await avater.getInitials(user.name);

      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
