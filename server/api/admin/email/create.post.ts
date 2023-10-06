export default defineEventHandler(async (event) => {
  const { customAddress, destinationAddress } = await readBody(event);

  const { cloudflare } = useRuntimeConfig(event);
  const cloudflareBaseAPI = "https://api.cloudflare.com/client/v4";
  const cloudflareAPIAdress = `${cloudflareBaseAPI}/accounts/${cloudflare.account}/email/routing/addresses`;
  const cloudflareAPIRules = `${cloudflareBaseAPI}/zones/${cloudflare.zoneTag}/email/routing/rules`;

  const addAddress = await $fetch(cloudflareAPIAdress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Email": cloudflare.email,
      "X-Auth-Key": cloudflare.apiKey
    },
    body: {
      email: destinationAddress
    }
  }).catch(() => null);

  if (!addAddress) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to add address"
    });
  }

  return $fetch(cloudflareAPIRules, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Email": cloudflare.email,
      "X-Auth-Key": cloudflare.apiKey
    },
    body: {
      matchers: [
        {
          field: "to",
          type: "literal",
          value: customAddress
        }
      ],
      actions: [
        {
          type: "forward",
          value: [
            destinationAddress
          ]
        }
      ],
      enabled: true,
      name: `Send to ${destinationAddress} rule.`,
      priority: 0
    }
  }).catch(() => null);
});
