// SignUp.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "../lib/supabase";
import { api } from "../utils/trpc";

interface SignUpProps {
  onSignUp: (email: string, password: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState<{
    longitude: number;
    latitude: number;
  }>({
    latitude: 44,
    longitude: 33,
  });
  const [role, setRole] = useState<"ADMIN" | "USER" | "OWNER">("USER");
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    // You can add validation here before calling onSignUp
    console.log(email, password);
  };

  async function signInWithEmail() {
    setLoading(true);
    await supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then(() => {
        Alert.alert("signed in ");
      })
      .catch((e) => {
        if (e) Alert.alert(e.message);
      });

    setLoading(false);
  }

  const createUser = api.user.create.useMutation().mutate;
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (user) {
      await createUser({
        id: user?.id,
        email,
        location,
        name,
        role,
      });
    }
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && <ActivityIndicator />}
      <View style={styles.container}>
        <Input
          placeholder="Name"
          leftIcon={<Icon name="envelope" size={24} color="black" />}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CheckBox
            onPress={() => {
              setRole("USER");
            }}
            checked={role === "USER"}
          />
          <Text>User</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <CheckBox
            onPress={() => {
              setRole("OWNER");
            }}
            checked={role === "OWNER"}
          />
          <Text>Owner</Text>
        </View>
        <Input
          placeholder="Email"
          leftIcon={<Icon name="envelope" size={24} color="black" />}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          placeholder="Password"
          leftIcon={<Icon name="lock" size={24} color="black" />}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button title="Sign Up" onPress={signUpWithEmail} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
