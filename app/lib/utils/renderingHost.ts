export function getRenderingHost(site: string): { name?: string; url?: string; revalidateSecret?: string } | undefined {
  const sites = [
    {
      name: process.env.NEXT_PUBLIC_SITE_1_NAME,
      url: process.env.NEXT_PUBLIC_SITE_1_URL,
      revalidateSecret: process.env.SITE_1_REVALIDATE_SECRET,
    },
    {
      name: process.env.NEXT_PUBLIC_SITE_2_NAME,
      url: process.env.NEXT_PUBLIC_SITE_2_URL,
      revalidateSecret: process.env.SITE_2_REVALIDATE_SECRET,
    },
  ];

  return sites.find(s => s.name === site);
}
