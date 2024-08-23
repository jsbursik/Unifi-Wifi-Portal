import MicrosoftEntraId from "@auth/core/providers/microsoft-entra-id";
import { ExpressAuthConfig } from "@auth/express";

export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  providers: [
    MicrosoftEntraId({
      clientId: process.env.ENTRA_CLIENT_ID,
      clientSecret: process.env.ENTRA_CLIENT_SECRET,
      tenantId: process.env.ENTRA_TENANT_ID,
    }),
  ],
};
