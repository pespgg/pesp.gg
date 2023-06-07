const useUserSessionState = () => useState("nuxt-session", () => ({}));

export const useUserSession = () => {
  const sessionState = useUserSessionState();
  return {
    loggedIn: computed(() => Boolean(sessionState.value.user)),
    user: computed(() => sessionState.value.user || null),
    data: sessionState,
    fetch,
    clear,
    set
  };
};

const set = async (body) => {
  useUserSessionState().value = await $fetch("/api/admin/auth", { method: "POST", body }).catch(() => ({}));
  return useUserSessionState().value;
};

const fetch = async () => {
  useUserSessionState().value = await useRequestFetch()("/api/admin/auth").catch(() => ({}));
};

const clear = () => {
  useUserSessionState().value = {};
  return $fetch("/api/admin/auth", { method: "DELETE" });
};
