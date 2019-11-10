let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

/**
 * The settings table stores its data in a single JSONB column. This allows us to easily
 * add and remove settings, and to only store settings that differ from the defaults.
 */
exports.up = function(db, callback) {
  db.runSql(
    `CREATE TABLE settings (
      membershipId int PRIMARY KEY NOT NULL,
      settings jsonb NOT NULL default '{}'::jsonb,
      createdAt timestamp NOT NULL,
      createdBy text NOT NULL,
      lastUpdatedAt timestamp NOT NULL,
      lastUpdatedBy text NOT NULL
    )`,
    callback
  );
};

exports.down = function(db, callback) {
  db.dropTable('settings', callback);
};

exports._meta = {
  version: 1
};
