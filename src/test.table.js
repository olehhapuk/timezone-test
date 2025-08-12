const { integer, pgTable, timestamp } = require('drizzle-orm/pg-core');

const testTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: timestamp('date').notNull(),
});

exports.testTable = testTable;
