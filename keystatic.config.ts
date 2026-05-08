// keystatic.config.ts
import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'ccs-mascots1/ccs-mascots',
  },
  collections: {
    pricingGuideCards: collection({
      label: 'Pricing Guide Cards',
      slugField: 'title',
      path: 'src/content/pricing-guide-cards/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Card Name' } }),
        price: fields.text({ label: 'Price' }),
        image: fields.image({
          label: 'Image',
          directory: 'src/images',
          publicPath: '/src/images/',
        }),
        description: fields.text({ label: 'Description' }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: 'Home Page',
      path: 'src/content/home',
      format: { data: 'json' },
      schema: {
        hero: fields.object({
          heroHeadlineLine1: fields.text({ label: 'Headline Line 1', defaultValue: 'Costumes and' }),
          heroHeadlineLine2: fields.text({ label: 'Headline Line 2', defaultValue: 'Fursuits, Maine' }),
          heroHeadlineLine3: fields.text({ label: 'Headline Line 3', defaultValue: 'Made Your Way' }),
          heroTagline: fields.text({
            label: 'Tagline',
            defaultValue: 'Affordable, Durable, Adorable Custom Costumes made just for you!',
          }),
          heroPrimaryButtonText: fields.text({ label: 'Primary Button Text', defaultValue: 'Get a Quote' }),
          heroPrimaryButtonUrl: fields.url({
            label: 'Primary Button URL',
            defaultValue:
              'https://docs.google.com/forms/d/e/1FAIpQLSdvfWdapp_bzKXglitzdxh65CiGRf7PifEItHlmHBU5zKwX_Q/viewform',
          }),
          heroSecondaryButtonText: fields.text({ label: 'Secondary Button Text', defaultValue: 'Terms of Service' }),
          heroSecondaryButtonUrl: fields.url({
            label: 'Secondary Button URL',
            defaultValue: 'https://docs.google.com/document/d/1TyKMxOpOX514vxL4cl_tLCc27aMnGeRZZWeNfWybef0/edit?tab=t.0',
          }),
        }, { label: 'Hero' }),
        pricingGuide: fields.object({
          pricingTitle: fields.text({ label: 'Title', defaultValue: 'Price Guide' }),
          pricingDisclaimer: fields.text({
            label: 'Disclaimer',
            defaultValue:
              'Prices listed are for basic with no added extras. Costs may increase to reflect added details and design difficulty.',
          }),
        }, { label: 'Pricing Guide' }),
        about: fields.object({
          aboutTitle: fields.text({ label: 'Title', defaultValue: 'About Us' }),
          aboutBody: fields.text({
            label: 'Body',
            defaultValue:
              'Local to the Maine Furry Community since 2014, we have prided ourselves on providing Quality, Affordable Mascot Style Costumes. We use innovative methods such as 3D modeling and printing, as well as the finest fabrics and materials, to create a comfortable and durable costume that will last for years to come.',
          }),
          aboutImage: fields.image({
            label: 'Image',
            directory: 'src/images',
            publicPath: '/src/images/',
          }),
        }, { label: 'About' }),
        cta: fields.object({
          ctaTitle: fields.text({
            label: 'Title',
            defaultValue: 'Ready to Bring Your Character to Life?',
          }),
          ctaSubtitle: fields.text({
            label: 'Subtitle',
            defaultValue: 'Custom fursuits built with love, right here in Maine.',
          }),
          ctaImage: fields.image({
            label: 'Background Image',
            directory: 'src/images',
            publicPath: '/src/images/',
          }),
          ctaButtonText: fields.text({ label: 'Button Text', defaultValue: 'Get a Quote' }),
          ctaButtonUrl: fields.url({
            label: 'Button URL',
            defaultValue:
              'https://docs.google.com/forms/d/e/1FAIpQLSdvfWdapp_bzKXglitzdxh65CiGRf7PifEItHlmHBU5zKwX_Q/viewform',
          }),
        }, { label: 'CTA' }),
        footer: fields.object({
          footerTagline: fields.text({
            label: 'Tagline',
            defaultValue: 'Delivering smiles to the Furry Community and Costume Enthusiasts alike since 2014',
          }),
          footerLocation: fields.text({ label: 'Location', defaultValue: 'Augusta ME, 04330' }),
          footerEmail: fields.text({ label: 'Email', defaultValue: 'CraftyWolf@ccsmascots.net' }),
          facebookUrl: fields.url({ label: 'Facebook URL', defaultValue: 'https://www.facebook.com/CCSMascots/' }),
          instagramUrl: fields.url({ label: 'Instagram URL', defaultValue: 'https://www.instagram.com/ccsmascots/' }),
          tiktokUrl: fields.url({ label: 'TikTok URL', defaultValue: 'https://www.tiktok.com/@ccsmascots' }),
        }, { label: 'Footer' }),
      },
    }),
    galleries: singleton({
      label: 'Galleries',
      path: 'src/content/galleries',
      format: { data: 'json' },
      schema: {
        galleryImages: fields.array(
          fields.object(
            {
              image: fields.image({
                label: 'Image',
                directory: 'src/images',
                publicPath: '/src/images/',
              }),
              alt: fields.text({ label: 'Alt Text', defaultValue: '' }),
            },
            { label: 'Gallery Image' }
          ),
          { label: 'Gallery Images' }
        ),
      },
    }),
  },
});
