export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }

  const { cloudflare } = useRuntimeConfig(event);

  const cloudflareAPI = `https://api.cloudflare.com/client/v4/zones/${cloudflare.zoneTag}/email/routing/rules`;
  const emailList = await $fetch(cloudflareAPI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Email": cloudflare.email,
      "X-Auth-Key": cloudflare.apiKey
    }
  }).catch(() => null);

  const emailRules = emailList?.result || [];
  if (!emailRules.length) return [];
  const correos = emailRules.filter((c) => c.matchers[0].type === "literal" && c.actions[0].type === "forward" && c.enabled);
  return correos;
});
