import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { api } from "../trpc";
import { User } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useUser() {
  const [supabaseUser, setSupabaseUser] = useState<User | null>();

  useEffect(() => {
    console.log({ supabaseUser });
  }, [supabaseUser]);
  const user = api.user.getById.useQuery({
    id: supabaseUser?.id || "",
  });

  useEffect(() => {
    supabase.auth.getUser().then((data) => {
      setSupabaseUser(data.data.user);
    });
  }, []);

  if (!user.isLoading && user.data) {
    AsyncStorage.setItem("user", JSON.stringify(user.data));
  }
  return { user };
}

export function useLocalUser() {
  const [user, setUser] = useState<any>();
  AsyncStorage.getItem("user").then((user) => {
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(useUser().user.data);
    }
  });
  return user;
}
