import type { Schema, Struct } from '@strapi/strapi';

export interface ContentContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_content_blocks';
  info: {
    description: '';
    displayName: 'Content Block';
    icon: 'bulletList';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface LinkContactLink extends Struct.ComponentSchema {
  collectionName: 'components_link_contact_links';
  info: {
    description: '';
    displayName: 'Contact Link';
    icon: 'discuss';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.Enumeration<
      ['email', 'linkedin', 'github', 'instagram', 'facebook', 'twitter']
    > &
      Schema.Attribute.Required;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MetaTag extends Struct.ComponentSchema {
  collectionName: 'components_meta_tags';
  info: {
    displayName: 'Tag';
    icon: 'folder';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    description: '';
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.content-block': ContentContentBlock;
      'link.contact-link': LinkContactLink;
      'meta.tag': MetaTag;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
