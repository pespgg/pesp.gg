const useUserSessionState = () => useState<PespSession>("nuxt-session", () => ({}));

export const useUserSession = () => {
  const sessionState = useUserSessionState();
  return {
    loggedIn: computed(() => Boolean(sessionState.value.user)),
    user: computed(() => sessionState.value.user || null as unknown as PespUser),
    data: sessionState,
    fetch,
    clear
  };
};

const fetch = async () => {
  useUserSessionState().value = await useRequestFetch()("/api/admin/auth").catch(() => ({}));
};

const clear = () => {
  useUserSessionState().value = {};
  return $fetch("/api/admin/auth", { method: "DELETE" });
};
