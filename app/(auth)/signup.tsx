import { Formik } from "formik";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/constants/Images";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signUp } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";
import { Checkbox } from "react-native-paper";
import { SignUpSchema } from "@/utils/Validations/SignUpValidation";
import { useCreateUser } from "@/utils/api";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate: createUser } = useCreateUser();
  const { t } = useTranslation();

  const [checked, setChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async (
    values: FormValues,
    { setErrors }: { setErrors: (errors: Record<string, string>) => void }
  ): Promise<void> => {
    try {
      setLoading(true);
      await signUp(
        values.username,
        values.email,
        values.password,
        checked,
        setUser
      );
      createUser({
        username: values.username,
        email: values.email,
      });
      router.replace("/home");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrors({ email: "This email is already in use." });
          break;
        default:
          console.error("Error signing up: ", error);
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={Images.primaryBackground}
      resizeMode="cover"
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView className="flex-1 justify-center">
          <View className="flex-row justify-end px-5 mb-2">
            <LanguageSelector />
          </View>
          <Text className="font-bold text-4xl text-white px-5">
            {t("signup")}
          </Text>
          <View className="w-full h-[620px] px-5 my-6 bg-white rounded-t-3xl rounded-b-3xl py-6">
            <Text className="text-2xl font-bold mt-10">
              {t("createFreeAccount")}
            </Text>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={handleSignUp}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldError,
              }) => (
                <>
                  <CustomInputField
                    placeholder="username"
                    useTranslation={true}
                    value={values.username}
                    handleChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    containerStyles="mt-7"
                    error={
                      touched.username && errors.username ? errors.username : ""
                    }
                  />
                  <CustomInputField
                    placeholder="email"
                    useTranslation={true}
                    value={values.email}
                    handleChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    containerStyles="mt-2"
                    error={touched.email && errors.email ? errors.email : ""}
                  />
                  <CustomInputField
                    placeholder="password"
                    useTranslation={true}
                    type="password"
                    value={values.password}
                    handleChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    containerStyles="mt-2"
                    error={
                      touched.password && errors.password ? errors.password : ""
                    }
                  />
                  <CustomInputField
                    placeholder="confirmPassword"
                    useTranslation={true}
                    type="password"
                    value={values.confirmPassword}
                    handleChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    containerStyles="mt-2"
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ""
                    }
                  />
                  <View className="flex-row items-center mt-1">
                    <Checkbox
                      status={checked ? "checked" : "unchecked"}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />{" "}
                    <Text className="text-lg">{t("rememberMe")}</Text>
                  </View>
                  <CustomButton
                    label={loading ? t("signingUp") : t("signup")}
                    onPress={handleSubmit}
                    containerStyles="mt-3"
                    textStyles="text-white"
                    isDisabled={loading}
                  />
                </>
              )}
            </Formik>
            <View className="justify-center pt-5 flex-row gap-2 items-center">
              <Text className="text-lg">{t("alreadyHaveAccount")}</Text>
              <Link
                href="/signin"
                className="text-lg font-semibold text-secondary"
              >
                {t("signin")}
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;
