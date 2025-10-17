import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

type FormValues = { login: string; password: string };

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Submitted fields:", data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? "MyId" : "Log in"}
        </Text>

        {!isSignUp && (
          <>
            <Controller
              control={control}
              name="login"
              rules={{
                required: "Login is required",
                minLength: { value: 1, message: "Min 1 characters" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    mode="outlined"
                    label="Login"
                    placeholder="login"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="username"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    error={!!errors.login}
                  />
                  <HelperText type="error" visible={!!errors.login}>
                    {errors.login?.message}
                  </HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Your password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    textContentType="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    error={!!errors.password}
                  />
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password?.message}
                  </HelperText>
                </>
              )}
            />
          </>
        )}

        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          mode="contained"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Enter
        </Button>

        <Button mode="text" onPress={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? "Sign in with username/password" : "Sign in with MyId"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, padding: 15, justifyContent: "center" },
  title: { textAlign: "center", marginBottom: 24 },
  input: { marginBottom: 8 },
  button: { marginTop: 8, marginBottom: 14 },
});
