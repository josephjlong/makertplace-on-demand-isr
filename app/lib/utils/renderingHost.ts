import sitesData from "@/data/sites.json";

export function getRenderingHost(site: string): string {

       const matchedSite = sitesData.sites.find(
    (siteObj: { name: string; url: string }) => siteObj.name === site
  ) || {
    name: "Not found",
    url: "Not found",
  };
      
  return matchedSite.url;
}