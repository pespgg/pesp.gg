export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();
  const login = to.name === "admin";
  if (!loggedIn.value && !login) {
    return navigateTo("/admin");
  }
  else if (loggedIn.value && login) {
    return navigateTo("/admin/dashboard");
  }
});
