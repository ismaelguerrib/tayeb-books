import { faker } from '@faker-js/faker';
import { createStrapi } from '@strapi/strapi';

async function seed() {
  console.log('🌱 Seeding Books with Faker...');
  const imagePaths = [
    '../public/uploads/duo_7c9c6a5777.jpg',
    '../public/uploads/lumiere_561f6b2ec0.jpg',
    '../public/uploads/portrait_f5bd2c7dc7.jpg',
  ];

  try {
    const strapi = createStrapi();
    await strapi.load();
    await strapi.start();

    const existingBooks = await strapi.entityService.findMany(
      'api::book.book',
      {}
    );

    if (existingBooks.length === 0) {
      console.log('Fetching authors and categories...');

      const authors = await strapi.entityService.findMany(
        'api::author.author',
        {}
      );
      const categories = await strapi.entityService.findMany(
        'api::category.category',
        {}
      );

      if (authors.length === 0 || categories.length === 0) {
        console.error('❌ Cannot seed Books: No authors or categories found.');
        process.exit(1);
      }

      const books = Array.from({ length: 10 }).map(() => ({
        Title: faker.lorem.words(3),
        Description: faker.lorem.paragraphs(2),
        Price: Number(faker.finance.amount({ min: 5, max: 50, dec: 2 })), // decimal price between 5 and 50
        Image: [
          '../public/uploads/duo_7c9c6a5777.jpg',
          '../public/uploads/lumiere_561f6b2ec0.jpg',
          '../public/uploads/duo_7c9c6a5777.jpg',
          '../public/uploads/portrait_f5bd2c7dc7.jpg',
        ],
        author: authors[Math.floor(Math.random() * authors.length)].id,
        categories: categories
          .sort(() => 0.5 - Math.random())
          .slice(0, faker.number.int({ min: 1, max: 2 })) // 1 to 2 random categories
          .map((c) => c.id),
      }));

      for (const book of books) {
        await strapi.entityService.create('api::book.book', {
          data: {
            Title: book.Title,
            Description: book.Description,
            Price: book.Price,
            author: book.author
              ? { connect: [{ id: book.author }] }
              : undefined,
            categories: book.categories.length
              ? { connect: book.categories.map((id) => ({ id })) }
              : undefined,
            Image: imagePaths[Math.floor(Math.random() * imagePaths.length)],
          },
        });
      }

      console.log('✅ 10 Books seeded successfully!');
    } else {
      console.log('✅ Books already exist, skipping seeding.');
    }

    await strapi.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seed();
