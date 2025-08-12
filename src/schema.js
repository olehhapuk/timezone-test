const { integer, pgTable, timestamp } = require('drizzle-orm/pg-core');

const testTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: timestamp('date', {
    withTimezone: true,
  }).notNull(),
});

exports.testTable = testTable;
