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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.content-block': ContentContentBlock;
    }
  }
}
