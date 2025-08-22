import sitesData from "@/data/sites.json";

const siteMap: Record<string, string> = {};
sitesData.sites.forEach((siteObj: { name: string; url: string }) => {
  siteMap[siteObj.name] = siteObj.url;
});

export function getRenderingHost(site: string): string {
  return siteMap[site] || "Not found";
}