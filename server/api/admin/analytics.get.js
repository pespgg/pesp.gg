export default eventHandler(async (event) => {
  const { cloudflare } = useRuntimeConfig(event);
  const { days } = getQuery(event);

  const { zoneTag, email, apiKey } = cloudflare;

  const lt = new Date();

  const gt = new Date(lt);
  gt.setDate(gt.getDate() - days);

  const date_lt = lt.toISOString().split("T")[0];
  const date_gt = gt.toISOString().split("T")[0];

  const graphql = {
    query: `{
      viewer {
        zones(filter: {zoneTag: "${zoneTag}"}) {
          httpRequests1dGroups(
            orderBy: [date_ASC]
            limit: 1000
            filter: {
              date_geq: "${date_gt}"
              date_lt: "${date_lt}"
            }
          ) {
            dimensions {
              date
            }
            sum {
              pageViews
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
