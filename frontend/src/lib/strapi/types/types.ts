import type { Modules, Schema, UID, Utils } from '@strapi/strapi'

type IDProperty = { id: number }

type InvalidKeys<TSchemaUID extends UID.Schema> = Utils.Object.KeysBy<
  Schema.Attributes<TSchemaUID>,
  Schema.Attribute.Private | Schema.Attribute.Password
>

export type GetValues<TSchemaUID extends UID.Schema> = {
  [TKey in Schema.OptionalAttributeNames<TSchemaUID>]?: Schema.AttributeByName<
    TSchemaUID,
    TKey
  > extends infer TAttribute extends Schema.Attribute.Attribute
    ? GetValue<TAttribute>
    : never
} & {
  [TKey in Schema.RequiredAttributeNames<TSchemaUID>]-?: Schema.AttributeByName<
    TSchemaUID,
    TKey
  > extends infer TAttribute extends Schema.Attribute.Attribute
    ? GetValue<TAttribute>
    : never
} extends infer TValues
  ? // Remove invalid keys (private, password)
    Omit<TValues, InvalidKeys<TSchemaUID>>
  : never

type RelationValue<TAttribute extends Schema.Attribute.Attribute> =
  TAttribute extends Schema.Attribute.Relation<
    infer TRelationKind,
    infer TTarget
  >
    ? Utils.MatchFirst<
        [
          [
            Utils.Extends<
              TRelationKind,
              Schema.Attribute.RelationKind.WithTarget
            >,
            TRelationKind extends `${string}ToMany`
              ? Omit<APIResponseCollection<TTarget>, 'meta'>
              : APIResponse<TTarget> | null,
          ],
        ],
        `TODO: handle other relation kind (${TRelationKind})`
      >
    : never

type ComponentValue<TAttribute extends Schema.Attribute.Attribute> =
  TAttribute extends Schema.Attribute.Component<
    infer TComponentUID,
    infer TRepeatable
  >
    ? IDProperty &
        Utils.If<
          TRepeatable,
          GetValues<TComponentUID>[],
          GetValues<TComponentUID> | null
        >
    : never

type DynamicZoneValue<TAttribute extends Schema.Attribute.Attribute> =
  TAttribute extends Schema.Attribute.DynamicZone<infer TComponentUIDs>
    ? Array<
        Utils.Array.Values<TComponentUIDs> extends infer TComponentUID
          ? TComponentUID extends UID.Component
            ? { __component: TComponentUID } & IDProperty &
                GetValues<TComponentUID>
            : never
          : never
      >
    : never

type MediaValue<TAttribute extends Schema.Attribute.Attribute> =
  TAttribute extends Schema.Attribute.Media<infer _TKind, infer TMultiple>
    ? Utils.If<
        TMultiple,
        APIResponseCollection<'plugin::upload.file'>,
        APIResponse<'plugin::upload.file'> | null
      >
    : never

export type GetValue<TAttribute extends Schema.Attribute.Attribute> = Utils.If<
  Utils.IsNotNever<TAttribute>,
  Utils.MatchFirst<
    [
      // Relation
      [
        Utils.Extends<TAttribute, Schema.Attribute.OfType<'relation'>>,
        RelationValue<TAttribute>,
      ],
      // DynamicZone
      [
        Utils.Extends<TAttribute, Schema.Attribute.OfType<'dynamiczone'>>,
        DynamicZoneValue<TAttribute>,
      ],
      // Component
      [
        Utils.Extends<TAttribute, Schema.Attribute.OfType<'component'>>,
        ComponentValue<TAttribute>,
      ],
      // Media
      [
        Utils.Extends<TAttribute, Schema.Attribute.OfType<'media'>>,
        MediaValue<TAttribute>,
      ],
      // Fallback
      // If none of the above attribute type, fallback to the original Schema.Attribute.GetValue (while making sure it's an attribute)
      [
        Utils.Constants.True,
        Modules.Documents.Params.Attribute.GetValue<TAttribute>,
      ],
    ],
    unknown
  >,
  unknown
>

export interface APIResponseData<TContentTypeUID extends UID.ContentType>
  extends IDProperty {
  attributes: GetValues<TContentTypeUID>
}

export interface APIResponseCollectionMetadata {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface APIResponse<TContentTypeUID extends UID.ContentType> {
  data: APIResponseData<TContentTypeUID>
}

export interface APIResponseCollection<
  TContentTypeUID extends UID.ContentType,
> {
  data: APIResponseData<TContentTypeUID>[]
  meta: APIResponseCollectionMetadata
}
