import MicrosoftEntraId from '@auth/core/providers/microsoft-entra-id';

export const authConfig = {
  trustHost: true,
  providers: [
    MicrosoftEntraId({
      clientId: process.env.ENTRA_CLIENT_ID,
      clientSecret: process.env.ENTRA_CLIENT_SECRET,
      tenantId: process.env.ENTRA_TENANT_ID
    }),
  ]
}