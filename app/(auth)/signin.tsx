import { View, Text, ImageBackground, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/constants/Images";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { login } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";
import { Checkbox } from "react-native-paper";
import { Formik } from "formik";
import { SignInSchema } from "@/utils/Validations/SignInValidation";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { t } = useTranslation();

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (
    values: FormValues,
    { setErrors }: { setErrors: (errors: Record<string, string>) => void }
  ) => {
    const { email, password } = values;
    try {
      setLoading(true);
      await login(email, password, checked, setUser);
      router.replace("/home");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
          setErrors({ password: "Invalid email or password." });
          break;
        default:
          Alert.alert("Login Failed", "An unexpected error occurred.");
      }
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
            {t("signin")}
          </Text>
          <View className="w-full h-[450px] px-5 my-6 bg-white rounded-t-3xl rounded-b-3xl py-6">
            <Text className="text-2xl font-bold mt-10">{t("welcome")}!</Text>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={handleSignIn}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <CustomInputField
                    placeholder="email"
                    useTranslation={true}
                    value={values.email}
                    handleChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    containerStyles="mt-7"
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
                  <View className="flex-row items-center mt-1">
                    <Checkbox
                      status={checked ? "checked" : "unchecked"}
                      onPress={() => setChecked(!checked)}
                    />
                    <Text className="text-lg">{t("rememberMe")}</Text>
                  </View>
                  <CustomButton
                    label={loading ? t("loading") : t("signin")}
                    onPress={handleSubmit}
                    containerStyles="mt-3"
                    textStyles="text-white"
                    isDisabled={loading}
                  />
                </>
              )}
            </Formik>
            <View className="justify-center pt-5 flex-row gap-2 items-center">
              <Text className="text-lg">{t("dontHaveAccount")}</Text>
              <Link
                href="/signup"
                className="text-lg font-semibold text-secondary"
              >
                {t("signup")}
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignIn;
