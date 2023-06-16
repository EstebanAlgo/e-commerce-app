import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [

  {
    id: 'apps',
    title: 'Applications',
    subtitle: 'Custom made application designs',
    type: 'group',
    icon: 'heroicons-outline:cube',
    translate: 'APPLICATIONS',
    children: [
      {
        id: 'apps.ecommerce',
        title: 'ECommerce',
        type: 'collapse',
        icon: 'heroicons-outline:shopping-cart',
        translate: 'ECOMMERCE',
        children: [
          {
            id: 'e-commerce-products',
            title: 'Products',
            type: 'item',
            url: 'apps/e-commerce/products',
            end: true,
          },
          {
            id: 'e-commerce-new-product',
            title: 'New Product',
            type: 'item',
            url: 'apps/e-commerce/products/new',
          }
        ],
      }
    ],
  }
];

export default navigationConfig;
