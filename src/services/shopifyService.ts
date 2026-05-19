import Client from 'shopify-buy';

// Initialize the Shopify client
const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export const shopifyClient = domain && storefrontAccessToken 
  ? Client.buildClient({
      domain,
      storefrontAccessToken,
      apiVersion: '2023-10'
    })
  : null;

export const shopifyService = {
  /**
   * Creates a checkout and redirects the user to Shopify's secure payment page
   */
  async redirectToCheckout(variantId: string, customAttributes: { key: string, value: string }[] = []) {
    if (!shopifyClient) {
      console.error('Shopify client not initialized. Please check your .env variables.');
      return;
    }

    try {
      const checkout = await shopifyClient.checkout.create();
      const lineItemsToAdd = [{
        variantId,
        quantity: 1,
        customAttributes
      }];
      
      const updatedCheckout = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
      
      // Redirect to Shopify Checkout
      if (updatedCheckout.webUrl) {
        window.location.href = updatedCheckout.webUrl;
      }
    } catch (error) {
      console.error('Error creating Shopify checkout:', error);
      alert('חלה שגיאה בחיבור לתשלום. אנא נסו שוב מאוחר יותר.');
    }
  }
};
