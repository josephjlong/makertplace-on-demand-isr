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

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔗 Sitecore Integration

This application is designed to function using the [Page builder context panel](https://doc.sitecore.com/mp/en/developers/marketplace/extension-points.html#page-builder-context-panell) in the Sitecore Marketplace.

To test the application, you can follow the guide above to register the application using the Page context panel Extension Point.

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the repository.
