export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }

  const { cloudflare } = useRuntimeConfig(event);
  const { days } = getQuery(event);

  const { zoneTag, email, apiKey } = cloudflare;

  const leq = new Date();
  leq.setDate(leq.getDate());

  const gt = new Date(leq);
  gt.setDate(gt.getDate() - days);

  const date_gt = gt.toISOString().split("T")[0];
  const date_leq = leq.toISOString().split("T")[0];

  const graphql = {
    query: `{
      viewer {
        zones(filter: {zoneTag: "${zoneTag}"}) {
          httpRequests1dGroups(
            orderBy: [date_ASC]
            limit: 1000
            filter: {
              date_gt: "${date_gt}"
              date_leq: "${date_leq}"
            }
          ) {
            dimensions {
              date
            }
            sum {
              browserMap {
                pageViews
                uaBrowserFamily
              }
              pageViews
              threats
              countryMap {
                clientCountryName
                requests
              }
            }
            uniq {
              uniques
            }
          }
        }
      }
    }`
  };

  const cloudflareAnalytics = await $fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    body: JSON.stringify(graphql),
    headers: {
      "X-Auth-Email": email,
      "X-Auth-Key": apiKey
    }
  });

  const { data } = cloudflareAnalytics;
  const { httpRequests1dGroups } = data.viewer.zones[0];
  return httpRequests1dGroups;
});
