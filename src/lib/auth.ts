import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    {
      id: "osm",
      name: "OpenStreetMap",
      type: "oauth",
      wellKnown:
        "https://www.openstreetmap.org/.well-known/oauth-authorization-server",
      idToken: true,
      clientId: process.env.OSM_CLIENT_ID,
      clientSecret: process.env.OSM_CLIENT_SECRET,
      accessTokenUrl: "https://www.openstreetmap.org/oauth/token",
      requestTokenUrl: "https://www.openstreetmap.org/oauth/request_token",

      authorization: {
        url: "https://example.com/oauth/authorization",
        params: {
          scope:
            "read_prefs write_prefs write_diary write_api read_gpx write_gpx write_notes openid",
        },
      },

      profile: async (profile) => {
        console.log("profile", profile);
        return {
          id: profile.sub,
          name: profile.sub,
        };
      },
    },
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
};
