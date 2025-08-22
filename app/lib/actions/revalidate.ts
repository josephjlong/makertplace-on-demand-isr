'use server';

export async function triggerRevalidation({ language, site, isrPath }: { language: string; site: string; isrPath: string })  {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;

  const res = await fetch(`${siteURL}/api/revalidate-path?secret=${secret}&path=/${language}/_site_${site}${isrPath}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  console.log(`${siteURL}/api/revalidate-path?secret=${secret}&path=/${language}/_site_${site}${isrPath}`);

  if (!res.ok) {
    console.log(`Failed to revalidate: ${res.statusText}`);

    return await { success: false };
  }

  return await { success: true };
}
