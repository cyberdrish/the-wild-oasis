import { focusManager, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const queryClient = useQueryClient();
  // focusManager.setEventListener((handleFocus) => {
  //   // Listen to visibilitychange
  //   if (typeof window !== "undefined" && window.addEventListener) {
  //     const visibilitychangeHandler = () => {
  //       handleFocus(document.visibilityState === "visible");
  //       queryClient.invalidateQueries({ queryKey: ["user"] });
  //     };
  //     window.addEventListener("focus", visibilitychangeHandler, false);
  //     return () => {
  //       // Be sure to unsubscribe if a new handler is set
  //       window.removeEventListener("focus", visibilitychangeHandler);
  //     };
  //   }
  // });

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 0, // Always considered stale
    refetchOnWindowFocus: true,
    onSuccess: () => console.log("User fetched on focus"),
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
