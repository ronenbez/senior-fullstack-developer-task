import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialUserRoleSetup1680000000000 implements MigrationInterface {
  name = 'InitialUserRoleSetup1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    status INTEGER NULL
                )
            `);

      await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS roles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE
                )
            `);

      await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS user_roles (
                    user_id INTEGER NOT NULL,
                    role_id INTEGER NOT NULL,
                    PRIMARY KEY (user_id, role_id),
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
                )
            `);

      await queryRunner.query(`
                INSERT OR IGNORE INTO users (username, status) VALUES
                ('admin_user', 1),
                ('regular_user', 1),
                ('editor_user', 1)
            `);

      await queryRunner.query(`
                INSERT OR IGNORE INTO roles (name) VALUES
                ('Admin'),
                ('User'),
                ('Editor')
            `);

      await queryRunner.query(`
                INSERT OR IGNORE INTO user_roles (user_id, role_id) VALUES
                ((SELECT id FROM users WHERE username = 'admin_user'), (SELECT id FROM roles WHERE name = 'Admin')),
                ((SELECT id FROM users WHERE username = 'regular_user'), (SELECT id FROM roles WHERE name = 'User')),
                ((SELECT id FROM users WHERE username = 'editor_user'), (SELECT id FROM roles WHERE name = 'Editor'))
            `);
    } catch (error) {
      console.error('Migration up error:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS users`);
    } catch (error) {
      console.error('Migration down error:', error);
      throw error;
    }
  }
}
