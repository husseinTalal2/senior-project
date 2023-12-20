import { createReactQueryHooks, httpBatchLink } from "@trpc/react";
import type { AppRouter } from "backend";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import localhost from "react-native-localhost";

export const api = createTRPCReact<AppRouter>();

export const getBaseUrl = (): string => {
  return `http://192.168.1.15:4000`;
};

export function TRPCProvider(props: { children: JSX.Element }) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
      // // optional
      // headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
