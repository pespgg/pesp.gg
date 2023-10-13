export const SCHEMA_stats = {
  experience: [
    {
      title: "experiencia",
      counter: 5
    },
    {
      title: "actividades",
      counter: 250
    },
    {
      title: "plataformas",
      carousel: [
        {
          title: "pc",
          icon: "solar:monitor-linear"
        },
        {
          title: "consola",
          icon: "solar:gamepad-linear"
        },
        {
          title: "mobile",
          icon: "solar:iphone-linear"
        }
      ]
    }
  ],
  socials: [
    {
      title: "twitch",
      counter: 3200,
      seguidores: true,
      icon: SITE.socials.find(s => s.name === "Twitch")?.icon
    },
    {
      title: "instagram",
      counter: 12000,
      seguidores: true,
      icon: SITE.socials.find(s => s.name === "Instagram")?.icon
    },
    {
      title: "facebook",
      counter: 6000,
      seguidores: true,
      icon: SITE.socials.find(s => s.name === "Facebook")?.icon
    },
    {
      title: "twitter",
      counter: 850,
      seguidores: true,
      icon: SITE.socials.find(s => s.name === "X (Twitter)")?.icon
    }
  ]
};
