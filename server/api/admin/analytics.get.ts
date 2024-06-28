export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { cloudflare } = useRuntimeConfig(event);
  const { days } = getQuery(event);

  const { siteTag, account, email, apiKey } = cloudflare;

  const leq = new Date();
  leq.setDate(leq.getDate());

  const gt = new Date(leq);
  gt.setDate(gt.getDate() - Number(days));

  const date_gt = gt.toISOString();
  const date_leq = leq.toISOString();

  const graphql = {
    query: ` {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          total: rumPageloadEventsAdaptiveGroups(filter: $filter, limit: 1) {
            count
            sum {
              visits
            }
          }
          topBrowsers: rumPageloadEventsAdaptiveGroups(filter: $filter, limit: 15, orderBy: [$order]) {
            count
            avg {
              sampleInterval
            }
            sum {
              visits
            }
            dimensions {
              metric: userAgentBrowser
            }
          }
          topOSs: rumPageloadEventsAdaptiveGroups(filter: $filter, limit: 15, orderBy: [$order]) {
            count
            avg {
              sampleInterval
            }
            sum {
              visits
            }
            dimensions {
              metric: userAgentOS
            }
          }
          countries: rumPageloadEventsAdaptiveGroups(filter: $filter, limit: 200, orderBy: [$order]) {
            count
            avg {
              sampleInterval
            }
            sum {
              visits
            }
            dimensions {
              metric: countryName
            }
          }
          series: rumPageloadEventsAdaptiveGroups(limit: 5000, filter: $filter, orderBy: [date_DESC]) {
            count
            avg {
              sampleInterval
            }
            sum {
              visits
            }
            dimensions {
              ts: date
            }
          }
        }
      }
    }
    `.trim(),
    variables: {
      accountTag: account,
      filter: {
        AND: [
          { datetime_geq: date_gt, datetime_leq: date_leq },
          { OR: [{ siteTag }] },
          { bot: 0 }
        ]
      },
      order: "sum_visits_DESC"
    }
  };

  const cloudflareAnalytics = await $fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    body: graphql,
    headers: {
      "X-Auth-Email": email,
      "X-Auth-Key": apiKey
    }
  }).catch(() => null);

  if (!cloudflareAnalytics) throw createError({ statusCode: 500, message: "Failed to fetch Cloudflare analytics" });

  return (cloudflareAnalytics as any).data.viewer.accounts[0];
});
