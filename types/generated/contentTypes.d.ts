import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSlugifySlug extends Schema.CollectionType {
  collectionName: 'slugs';
  info: {
    singularName: 'slug';
    pluralName: 'slugs';
    displayName: 'slug';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    slug: Attribute.Text;
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    integrations: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::integration.integration'
    >;
    stripeCustomerId: Attribute.String & Attribute.Unique;
    humans: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::human.human'
    >;
    name: Attribute.String;
    interviews: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::interview.interview'
    >;
    alias: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::human.human'
    >;
    signed: Attribute.Boolean;
    chats: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::interview.interview'
    >;
    picture: Attribute.String;
    auth0id: Attribute.String & Attribute.Unique;
    notifications: Attribute.JSON;
    white_labels: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::white-label.white-label'
    >;
    assistants: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::assistant.assistant'
    >;
    shared_assistants: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::assistant.assistant'
    >;
    stripe_connect_id: Attribute.String & Attribute.Unique;
    stripe_connect_status: Attribute.Enumeration<['active', 'pending']>;
    stores: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::store.store'
    >;
    own_stores: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::store.store'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssistantAssistant extends Schema.CollectionType {
  collectionName: 'assistants';
  info: {
    singularName: 'assistant';
    pluralName: 'assistants';
    displayName: 'Assistant';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    welcomemessage: Attribute.String &
      Attribute.DefaultTo<"Welcome! You're about to chat with a smart AI assistant skilled in lively, unscripted interviews. But let's pretend you're chatting with a real person. Send your first message now!">;
    interviewer_prompt: Attribute.String;
    clients_brief: Attribute.Text;
    publisher_prompt: Attribute.String;
    telegramtoken: Attribute.String & Attribute.Unique;
    gpt_id: Attribute.String & Attribute.Unique;
    telegrambot_username: Attribute.String;
    request: Attribute.JSON;
    interviews: Attribute.Relation<
      'api::assistant.assistant',
      'oneToMany',
      'api::interview.interview'
    >;
    owner: Attribute.Relation<
      'api::assistant.assistant',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    bot_name: Attribute.String & Attribute.Required;
    bot_description: Attribute.Text;
    bot_about: Attribute.Text;
    botpic: Attribute.Media;
    integration: Attribute.Relation<
      'api::assistant.assistant',
      'oneToOne',
      'api::integration.integration'
    >;
    reactivation_after: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 86400;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    base_assistant: Attribute.Relation<
      'api::assistant.assistant',
      'manyToOne',
      'api::base-assistant.base-assistant'
    >;
    tone: Attribute.Relation<
      'api::assistant.assistant',
      'manyToOne',
      'api::tone.tone'
    >;
    slug: Attribute.UID<'api::assistant.assistant', 'bot_name'>;
    client_name: Attribute.String;
    client_overview: Attribute.Text;
    customised: Attribute.Boolean & Attribute.DefaultTo<false>;
    first_message: Attribute.JSON;
    notification_threshold: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<3>;
    knowledge_base: Attribute.JSON;
    tools: Attribute.Relation<
      'api::assistant.assistant',
      'manyToMany',
      'api::tool.tool'
    >;
    store: Attribute.Relation<
      'api::assistant.assistant',
      'manyToOne',
      'api::store.store'
    >;
    managers: Attribute.Relation<
      'api::assistant.assistant',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    cover_image: Attribute.Media;
    price_per_use: Attribute.Decimal &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    categories: Attribute.Relation<
      'api::assistant.assistant',
      'manyToMany',
      'api::category.category'
    >;
    bot_token_active: Attribute.Boolean & Attribute.DefaultTo<true>;
    gallery: Attribute.Media;
    secret_gallery: Attribute.Media;
    miniapps: Attribute.Relation<
      'api::assistant.assistant',
      'manyToMany',
      'api::miniapp.miniapp'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assistant.assistant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assistant.assistant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBadgeBadge extends Schema.CollectionType {
  collectionName: 'badges';
  info: {
    singularName: 'badge';
    pluralName: 'badges';
    displayName: 'Badge';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    humans: Attribute.Relation<
      'api::badge.badge',
      'manyToMany',
      'api::human.human'
    >;
    image: Attribute.Media;
    description: Attribute.Text;
    price: Attribute.Decimal;
    badge_id: Attribute.UID<'api::badge.badge', 'title'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::badge.badge',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::badge.badge',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBaseAssistantBaseAssistant extends Schema.CollectionType {
  collectionName: 'base_assistants';
  info: {
    singularName: 'base-assistant';
    pluralName: 'base-assistants';
    displayName: 'Base Assistant';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    task: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    communicator_prompt: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    baseschema: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    assistants: Attribute.Relation<
      'api::base-assistant.base-assistant',
      'oneToMany',
      'api::assistant.assistant'
    >;
    analyst_prompt: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    brief_label: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tip_message: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    placeholder: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    featured: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    white_labels: Attribute.Relation<
      'api::base-assistant.base-assistant',
      'manyToMany',
      'api::white-label.white-label'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::base-assistant.base-assistant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::base-assistant.base-assistant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::base-assistant.base-assistant',
      'oneToMany',
      'api::base-assistant.base-assistant'
    >;
    locale: Attribute.String;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.String & Attribute.Unique;
    description: Attribute.Text;
    order: Attribute.Integer & Attribute.Unique;
    assistants: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::assistant.assistant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmailTemplateEmailTemplate extends Schema.CollectionType {
  collectionName: 'email_templates';
  info: {
    singularName: 'email-template';
    pluralName: 'email-templates';
    displayName: 'EmailTemplate';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.String &
      Attribute.DefaultTo<'A new message from your 8D-1...'>;
    body: Attribute.Text;
    to_email: Attribute.String & Attribute.Required;
    from_email: Attribute.String &
      Attribute.DefaultTo<'f"{8D-1} <no-reply@x.8d-1.com>",'>;
    templateType: Attribute.UID & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::email-template.email-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::email-template.email-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGlobalGlobal extends Schema.SingleType {
  collectionName: 'globals';
  info: {
    singularName: 'global';
    pluralName: 'globals';
    displayName: 'Global';
    name: 'global';
    description: '';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    metadata: Attribute.Component<'meta.metadata'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    favicon: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    notificationBanner: Attribute.Component<'elements.notification-banner'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    navbar: Attribute.Component<'layout.navbar'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    footer: Attribute.Component<'layout.footer'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::global.global',
      'oneToMany',
      'api::global.global'
    >;
    locale: Attribute.String;
  };
}

export interface ApiHumanHuman extends Schema.CollectionType {
  collectionName: 'humans';
  info: {
    singularName: 'human';
    pluralName: 'humans';
    displayName: 'Human';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    telegram_handle: Attribute.String;
    interviews: Attribute.Relation<
      'api::human.human',
      'oneToMany',
      'api::interview.interview'
    >;
    name: Attribute.String;
    email: Attribute.String;
    avatar: Attribute.Media;
    owners: Attribute.Relation<
      'api::human.human',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    source: Attribute.Enumeration<
      ['telegram', 'web', 'email', 'api', 'widget', 'miniapp']
    >;
    user_id: Attribute.String & Attribute.Unique;
    alias: Attribute.Relation<
      'api::human.human',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    auth0id: Attribute.String & Attribute.Unique;
    uuid: Attribute.String & Attribute.Unique;
    is_anonymous: Attribute.Boolean & Attribute.DefaultTo<false>;
    last_active: Attribute.DateTime;
    white_labels: Attribute.Relation<
      'api::human.human',
      'manyToMany',
      'api::white-label.white-label'
    >;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    primary_language: Attribute.String;
    badges: Attribute.Relation<
      'api::human.human',
      'manyToMany',
      'api::badge.badge'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::human.human',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::human.human',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIntegrationIntegration extends Schema.CollectionType {
  collectionName: 'integrations';
  info: {
    singularName: 'integration';
    pluralName: 'integrations';
    displayName: 'Integration';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    auth_token: Attribute.String;
    base: Attribute.String;
    owner: Attribute.Relation<
      'api::integration.integration',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    assistant: Attribute.Relation<
      'api::integration.integration',
      'oneToOne',
      'api::assistant.assistant'
    >;
    Destination: Attribute.Enumeration<
      ['Airtable', 'Google Spreadsheet', 'defhuman']
    >;
    table: Attribute.String;
    headers: Attribute.JSON;
    data_quality_treshold: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 10;
        },
        number
      > &
      Attribute.DefaultTo<2>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::integration.integration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::integration.integration',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInterviewInterview extends Schema.CollectionType {
  collectionName: 'interviews';
  info: {
    singularName: 'interview';
    pluralName: 'interviews';
    displayName: 'Interview';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    last_review: Attribute.DateTime;
    last_length: Attribute.Integer & Attribute.DefaultTo<0>;
    transcript: Attribute.JSON;
    result: Attribute.JSON;
    assistant: Attribute.Relation<
      'api::interview.interview',
      'manyToOne',
      'api::assistant.assistant'
    >;
    human: Attribute.Relation<
      'api::interview.interview',
      'manyToOne',
      'api::human.human'
    >;
    is_active: Attribute.Boolean & Attribute.DefaultTo<true>;
    owner: Attribute.Relation<
      'api::interview.interview',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    data_quality: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 10;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    summary: Attribute.Text &
      Attribute.Unique &
      Attribute.DefaultTo<'Summary is not available yet.'>;
    title: Attribute.String & Attribute.DefaultTo<'No Title'>;
    authorized: Attribute.Relation<
      'api::interview.interview',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    thread_id: Attribute.UID;
    attachments: Attribute.Media;
    message_count: Attribute.Integer & Attribute.DefaultTo<1>;
    status: Attribute.Enumeration<['todo', 'in_progress', 'done']> &
      Attribute.DefaultTo<'todo'>;
    payment_status: Attribute.Enumeration<
      ['paid', 'pending', 'failed', 'trial']
    > &
      Attribute.DefaultTo<'paid'>;
    interview_status: Attribute.Enumeration<
      ['active', 'finished', 'paused', 'blocked']
    >;
    source: Attribute.Enumeration<['web', 'telegram', 'miniapp']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interview.interview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interview.interview',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMiniappMiniapp extends Schema.CollectionType {
  collectionName: 'miniapps';
  info: {
    singularName: 'miniapp';
    pluralName: 'miniapps';
    displayName: 'Miniapp';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bot_username: Attribute.String;
    assistants: Attribute.Relation<
      'api::miniapp.miniapp',
      'manyToMany',
      'api::assistant.assistant'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::miniapp.miniapp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::miniapp.miniapp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSolutionSolution extends Schema.CollectionType {
  collectionName: 'solutions';
  info: {
    singularName: 'solution';
    pluralName: 'solutions';
    displayName: 'Solution';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    slug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    pageData: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::solution.solution',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::solution.solution',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::solution.solution',
      'oneToMany',
      'api::solution.solution'
    >;
    locale: Attribute.String;
  };
}

export interface ApiStoreStore extends Schema.CollectionType {
  collectionName: 'stores';
  info: {
    singularName: 'store';
    pluralName: 'stores';
    displayName: 'Store';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    subtitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    assistants: Attribute.Relation<
      'api::store.store',
      'oneToMany',
      'api::assistant.assistant'
    >;
    cover: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    owner: Attribute.Relation<
      'api::store.store',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    contactemail: Attribute.Email &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    active: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    faq: Attribute.Component<'elements.faq', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    testimonial: Attribute.Component<'elements.testimonial', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    button: Attribute.Component<'links.button-link', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    store_name: Attribute.String &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    about_us: Attribute.Component<'elements.about-us'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    managers: Attribute.Relation<
      'api::store.store',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    logo: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    logo_dark: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    primary_color: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::store.store',
      'oneToMany',
      'api::store.store'
    >;
    locale: Attribute.String;
  };
}

export interface ApiStripeSettingStripeSetting extends Schema.SingleType {
  collectionName: 'stripe_settings';
  info: {
    singularName: 'stripe-setting';
    pluralName: 'stripe-settings';
    displayName: 'stripe-settings';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    priceId: Attribute.String;
    discounts: Attribute.JSON;
    trialDays: Attribute.Integer & Attribute.DefaultTo<14>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stripe-setting.stripe-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stripe-setting.stripe-setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiToneTone extends Schema.CollectionType {
  collectionName: 'tones';
  info: {
    singularName: 'tone';
    pluralName: 'tones';
    displayName: 'Tone';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    tone: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    toneprompt: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    assistants: Attribute.Relation<
      'api::tone.tone',
      'oneToMany',
      'api::assistant.assistant'
    >;
    featured: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tone.tone', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tone.tone', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::tone.tone',
      'oneToMany',
      'api::tone.tone'
    >;
    locale: Attribute.String;
  };
}

export interface ApiToolTool extends Schema.CollectionType {
  collectionName: 'tools';
  info: {
    singularName: 'tool';
    pluralName: 'tools';
    displayName: 'Tool';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text & Attribute.Required;
    parameters: Attribute.JSON & Attribute.Required;
    enabled: Attribute.Boolean;
    type: Attribute.String & Attribute.DefaultTo<'function'>;
    assistants: Attribute.Relation<
      'api::tool.tool',
      'manyToMany',
      'api::assistant.assistant'
    >;
    public_name: Attribute.String;
    public_description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tool.tool', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tool.tool', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiWhiteLabelWhiteLabel extends Schema.CollectionType {
  collectionName: 'white_labels';
  info: {
    singularName: 'white-label';
    pluralName: 'white-labels';
    displayName: 'White label';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    domain: Attribute.String;
    stripe_account_id: Attribute.String;
    auth0_domain: Attribute.String;
    auth0_client_id: Attribute.String;
    auth0_client_secret: Attribute.String;
    is_active: Attribute.Boolean;
    base_assistants: Attribute.Relation<
      'api::white-label.white-label',
      'manyToMany',
      'api::base-assistant.base-assistant'
    >;
    humans: Attribute.Relation<
      'api::white-label.white-label',
      'manyToMany',
      'api::human.human'
    >;
    users_permissions_users: Attribute.Relation<
      'api::white-label.white-label',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    openai_api_key: Attribute.String;
    stripe_price_id: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::white-label.white-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::white-label.white-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWidgetWidget extends Schema.CollectionType {
  collectionName: 'widgets';
  info: {
    singularName: 'widget';
    pluralName: 'widgets';
    displayName: 'widget';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    html: Attribute.Text;
    css: Attribute.Text;
    preview: Attribute.Media;
    description: Attribute.Text;
    icon: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::widget.widget',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::widget.widget',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::slugify.slug': PluginSlugifySlug;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::assistant.assistant': ApiAssistantAssistant;
      'api::badge.badge': ApiBadgeBadge;
      'api::base-assistant.base-assistant': ApiBaseAssistantBaseAssistant;
      'api::category.category': ApiCategoryCategory;
      'api::email-template.email-template': ApiEmailTemplateEmailTemplate;
      'api::global.global': ApiGlobalGlobal;
      'api::human.human': ApiHumanHuman;
      'api::integration.integration': ApiIntegrationIntegration;
      'api::interview.interview': ApiInterviewInterview;
      'api::miniapp.miniapp': ApiMiniappMiniapp;
      'api::solution.solution': ApiSolutionSolution;
      'api::store.store': ApiStoreStore;
      'api::stripe-setting.stripe-setting': ApiStripeSettingStripeSetting;
      'api::tone.tone': ApiToneTone;
      'api::tool.tool': ApiToolTool;
      'api::white-label.white-label': ApiWhiteLabelWhiteLabel;
      'api::widget.widget': ApiWidgetWidget;
    }
  }
}
