// import type { Core } from '@strapi/strapi';

import { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('🚀 Running Bootstrap Seed...');

      // User
      const existingUsers = await strapi.entityService.findMany(
        'admin::user',
        {}
      );
      if (existingUsers?.length) {
        console.log('Users already exist, skipping seeding.');
      } else {
        console.log('Seeding users...');
        // Create the admin user
        await strapi.entityService.create('admin::user', {
          data: {
            username: 'admin',
            email: 'admin@tayeb.org',
            password: 'admin',
            provider: 'local',
            confirmed: true,
            blocked: false,
            role: 'admin',
          },
        });
        // Create the editor user
        await strapi.entityService.create('admin::user', {
          data: {
            username: 'editor',
            email: 'editor@tayeb.org',
            password: 'editor',
            provider: 'local',
            confirmed: true,
            blocked: false,
            role: 'editor',
          },
        });
        console.log('Users seeded successfully.');
      }

      // Authors
      const existingAuthors = await strapi.entityService.findMany(
        'api::author.author',
        {}
      );
      if (existingAuthors?.length) {
        console.log('Authors already exist, skipping seeding.');
      } else {
        console.log('Seeding authors...');

        // Create authors

        const author1 = await strapi.entityService.create('api::author.author', {
          data: {
            Name: 'F. Scott Fitzgerald',
          },
        });
        const author2 = await strapi.entityService.create('api::author.author', {
          data: {
            Name: 'J.K. Rowling',
          },
        });
        const author3 = await strapi.entityService.create('api::author.author', {
          data: {
            Name: 'George R.R. Martin',
          },
        });
        const author4 = await strapi.entityService.create('api::author.author', {
          data: {
            Name: 'J.R.R. Tolkien',
          },
        });
      }


}
}
