const Database = require('better-sqlite3');
const db = new Database('db.sqlite3', { verbose: console.log });

const stmt_create_users = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        guild_id     text  not null,        
        user_id      text  not null,
        balance      int   not null  default 0,
        PRIMARY KEY (guild_id, user_id)
    )
`);
const stmt_create_shop = db.prepare(`
    CREATE TABLE IF NOT EXISTS shop (
        key       int   not null  primary key,
        guild_id  text  not null,
        name      text  not null,
        price     int   not null  default 0,
        UNIQUE (guild_id, name)
    )
`);
const stmt_create_user_items = db.prepare(`
    CREATE TABLE IF NOT EXISTS user_items (
        guild_id     text  not null,
        user_id      text  not null,
        item_key     int   not null,
        amount       int   not null  default 0,
        PRIMARY KEY ( guild_id, user_id, item_key ),
        FOREIGN KEY ( item_key )
            REFERENCES shop ( key )
                ON DELETE CASCADE
                ON UPDATE CASCADE
    )
`);
const stmt_create_guild_settings = db.prepare(`
    CREATE TABLE IF NOT EXISTS guild_settings (
        guild_id        text  not null  primary key,
        member_role_id  text
    )
`);

stmt_create_users.run();
stmt_create_shop.run();
stmt_create_user_items.run();
stmt_create_guild_settings.run();
