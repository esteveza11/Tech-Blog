const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'techguy',
    password: 'password123'
  },
  {
    username: 'coder123',
    password: 'password123'
  },
  {
    username: 'devqueen',
    password: 'password123'
  }
];

const postData = [
  {
    title: 'Introduction to MVC',
    content: 'The Model-View-Controller (MVC) framework is a design pattern used to separate the concerns of an application...',
    user_id: 1
  },
  {
    title: 'Understanding Sequelize ORM',
    content: 'Sequelize is a promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server...',
    user_id: 2
  },
  {
    title: 'Authentication with Express-Session',
    content: 'Authentication in Express.js applications can be handled through express-session, which helps to manage user sessions...',
    user_id: 3
  }
];

const commentData = [
  {
    comment_text: 'Great post! Thanks for sharing.',
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: 'This was really helpful, especially the part about associations!',
    user_id: 1,
    post_id: 2
  },
  {
    comment_text: 'I have been struggling with session management, this really helped me understand it better.',
    user_id: 3,
    post_id: 3
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed posts
  await Post.bulkCreate(postData);

  // Seed comments
  await Comment.bulkCreate(commentData);

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();
