const { DataTypes } = require('sequelize');
const db = require('./config/dbconfig.js');

// Import Models
const User = require('./Models/userModel.js');
const SuperAdmin = require('./Models/superadminModel.js');
const Category = require('./Models/categoryModel.js');
const Report = require('./Models/reportModel.js');
const ProfitGoal = require('./Models/profitGoalModel.js');
const FixedIncome = require('./Models/fixedincomeModel.js');
const FixedExpense = require('./Models/FixedExpense.js');
const RecurringIncome = require('./Models/RecurringIncome.js');
const RecurringExpense = require('./Models/RecurringExpense.js');

/* 🛠 User & SuperAdmin Relations - Same Access for Both */
User.hasMany(Report, { onDelete: 'CASCADE' });
Report.belongsTo(User);

User.hasMany(ProfitGoal, { onDelete: 'CASCADE' });
ProfitGoal.belongsTo(User);

ProfitGoal.hasMany(Report, { onDelete: 'CASCADE' });
Report.belongsTo(ProfitGoal);

ProfitGoal.hasMany(FixedIncome, { onDelete: 'CASCADE' });
ProfitGoal.hasMany(FixedExpense, { onDelete: 'CASCADE' });
ProfitGoal.hasMany(RecurringIncome, { onDelete: 'CASCADE' });
ProfitGoal.hasMany(RecurringExpense, { onDelete: 'CASCADE' });

FixedIncome.belongsTo(ProfitGoal);
FixedExpense.belongsTo(ProfitGoal);
RecurringIncome.belongsTo(ProfitGoal);
RecurringExpense.belongsTo(ProfitGoal);

/* 🛠 Income/Expense & User Relations - Same Access for Both */
FixedIncome.belongsTo(User);
FixedExpense.belongsTo(User);
RecurringIncome.belongsTo(User);
RecurringExpense.belongsTo(User);

/* 🛠 SuperAdmin has the same access as User to all resources */
SuperAdmin.hasMany(Report, { onDelete: 'CASCADE' });
Report.belongsTo(SuperAdmin);

SuperAdmin.hasMany(ProfitGoal, { onDelete: 'CASCADE' });
ProfitGoal.belongsTo(SuperAdmin);

ProfitGoal.hasMany(Report, { onDelete: 'CASCADE' });
Report.belongsTo(SuperAdmin);

ProfitGoal.hasMany(FixedIncome, { onDelete: 'CASCADE' });
ProfitGoal.hasMany(FixedExpense, { onDelete: 'CASCADE' });
ProfitGoal.hasMany(RecurringIncome, { onDelete: 'CASCADE' });
ProfitGoal.hasMany(RecurringExpense, { onDelete: 'CASCADE' });

FixedIncome.belongsTo(SuperAdmin);
FixedExpense.belongsTo(SuperAdmin);
RecurringIncome.belongsTo(SuperAdmin);
RecurringExpense.belongsTo(SuperAdmin);

/* 🛠 Income/Expense & SuperAdmin Relations - Same Access for Both */
FixedIncome.belongsTo(SuperAdmin);
FixedExpense.belongsTo(SuperAdmin);
RecurringIncome.belongsTo(SuperAdmin);
RecurringExpense.belongsTo(SuperAdmin);

// In User model (userModel.js)
User.hasMany(Category, { onDelete: 'CASCADE' }); // User can have many Categories
Category.belongsTo(User);  // Each Category belongs to a specific User

// In Category model (categoryModel.js)
Category.belongsTo(User);  // Each Category belongs to a User
User.hasMany(Category);    // User can have many Categories


// In SuperAdmin model (superadminModel.js)
SuperAdmin.hasMany(Category, { onDelete: 'CASCADE' }); // SuperAdmin can have many Categories
Category.belongsTo(SuperAdmin);  // Each Category belongs to a specific SuperAdmin

// In Category model (categoryModel.js)
Category.belongsTo(SuperAdmin);  // Each Category belongs to a SuperAdmin
SuperAdmin.hasMany(Category);    // SuperAdmin can have many Categories


// In ProfitGoal model (profitGoalModel.js)
ProfitGoal.belongsTo(Category); // each ProfitGoal belongs to a Category
Category.hasMany(ProfitGoal);   // each Category can have many ProfitGoals

// In Category model (categoryModel.js)
Category.hasMany(ProfitGoal);   // each Category can have many ProfitGoals
ProfitGoal.belongsTo(Category); // each ProfitGoal belongs to a Category

// Instead of using only Report.sync(), use db.sync() to sync all models
db.sync({ force: false })  // Set force: true only when you want to reset the tables
  .then(() => {
    console.log('Database synchronized tonight');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
