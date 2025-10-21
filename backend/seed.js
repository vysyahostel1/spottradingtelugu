const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Review = require('./models/Review');
const Settings = require('./models/Settings');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spot-trading');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@spottrading.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@spottrading.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created');
    }

    // Create sample users
    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
        role: 'user'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
        role: 'user'
      },
      {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: 'user'
      }
    ];

    for (const userData of sampleUsers) {
      const userExists = await User.findOne({ email: userData.email });
      if (!userExists) {
        const user = new User(userData);
        await user.save();
        console.log(`Sample user ${userData.name} created`);
      }
    }

    // Create sample courses
    const coursesExist = await Course.find();
    if (coursesExist.length === 0) {
      const courses = [
        {
          title: 'Advanced Technical Analysis',
          description: 'Master the art of technical analysis with advanced indicators and chart patterns.',
          price: 299,
          duration: '8 weeks',
          level: 'Advanced',
          instructor: 'John Smith'
        },
        {
          title: 'Forex Trading Mastery',
          description: 'Learn professional forex trading strategies and risk management techniques.',
          price: 399,
          duration: '12 weeks',
          level: 'Intermediate',
          instructor: 'Sarah Johnson'
        },
        {
          title: 'Cryptocurrency Trading',
          description: 'Navigate the crypto markets with confidence and understanding.',
          price: 249,
          duration: '6 weeks',
          level: 'Beginner',
          instructor: 'Mike Chen'
        }
      ];

      await Course.insertMany(courses);
      console.log('Sample courses created');
    }

    // Create sample reviews
    const reviewsExist = await Review.find();
    if (reviewsExist.length === 0) {
      const reviews = [
        {
          name: 'Sarah Johnson',
          role: 'Professional Trader',
          rating: 5,
          review: 'This course completely transformed my trading strategy. The instructors are experts and the content is incredibly detailed.',
          course: 'Advanced Technical Analysis',
          isApproved: true
        },
        {
          name: 'Michael Chen',
          role: 'Day Trader',
          rating: 5,
          review: 'Excellent course! The practical examples and real-world scenarios helped me understand complex concepts easily.',
          course: 'Forex Trading Mastery',
          isApproved: true
        },
        {
          name: 'Emily Davis',
          role: 'Crypto Investor',
          rating: 4,
          review: 'Great content and well-structured lessons. The community support is amazing and very helpful.',
          course: 'Cryptocurrency Trading',
          isApproved: true
        }
      ];

      await Review.insertMany(reviews);
      console.log('Sample reviews created');
    }

    // Create default settings
    const settingsExist = await Settings.findOne();
    if (!settingsExist) {
      const settings = new Settings({
        companyName: 'SPOT TRADING',
        contactEmail: 'info@spottrading.com',
        contactPhone: '+1 (555) 123-4567'
      });
      await settings.save();
      console.log('Default settings created');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
