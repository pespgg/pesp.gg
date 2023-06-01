const endpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const verifyTurnstile = (secret, token) => {
  return $fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      secret,
      response: token
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};
