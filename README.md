# Marketplace On-demand ISR

An On-demand Incremental Static Regeneration (ISR) application for the Sitecore Marketplace that empowers business users to manually trigger revalidation within XM Cloud. This is a sample application showingcasing how to create an XM Cloud page context panel extension to be leveraged in the Sitecore Marketplace with XM Cloud.

## 📦 Running the Application Locally

You can run this application locally, however note that it requires loading within the Sitecore Marketplace to enable full functionality.

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd marketplace-on-demand-isr
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set env variable**

   ```javascript
   REVALIDATE_SECRET = YourSecret;
   ```

4. **Configure sites at /app/data/sites.json**
   ```json
   {
     "sites": [
       {
         "name": "site1",
         "url": "https://rendering1.sitecore.com"
       },
       {
         "name": "site2",
         "url": "https://rendering2.sitecore.com"
       }
     ]
   }
   ```
5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔗 Sitecore Integration

This application is designed to function using the [Page builder context panel](https://doc.sitecore.com/mp/en/developers/marketplace/extension-points.html#page-builder-context-panell) in the Sitecore Marketplace.

To test the application, you can follow the guide above to register the application using the Page context panel Extension Point.

## 🌎 Head application integration

Within your XM Cloud head application you will need to add the revalidation secret and configure the revalidate API route <code>/api/revalidate-path</code> to accept the request to invalidate the path from the Marketplace application.

```javascript
/* eslint-disable */
export default async function handler(req: any, res: any) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const pathToRevalidate = req.query.path;
  console.log('Path to revalidate: ' + pathToRevalidate);
  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(pathToRevalidate);
    console.log('[revalidate]: Done!');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}

```

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the repository.
