'use server';

import { getRenderingHost } from "@/lib/utils/renderingHost";

export async function triggerRevalidation({ language, site, isrPath }: { language: string; site: string; isrPath: string })  {
  const secret = process.env.REVALIDATE_SECRET;
  const renderingHost = getRenderingHost(site);

  let res;
  try {
    res = await fetch(`${renderingHost}/api/revalidate-path?secret=${secret}&path=/${language}/_site_${site}${isrPath}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Error during revalidation fetch:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }

  if (!res.ok) {
    console.log(`Failed to revalidate: ${res.statusText}`);

    return await { success: false };
  }

  return await { success: true };
}
