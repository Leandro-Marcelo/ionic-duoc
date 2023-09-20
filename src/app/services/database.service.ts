import { Injectable, signal, WritableSignal } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

const DB_USERS = 'db_user';

export interface User {
  id: number;
  name: string;
  active: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);

  async initializePlugin(): Promise<void> {
    try {
      this.db = await this.sqlite.createConnection(
        DB_USERS,
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL, 
          active TEXT NOT NULL
        );
      `);
      await this.loadUsers();
    } catch (error) {
      console.error('Error initializing plugin', error);
    }
  }

  async loadUsers() {
    const users = await this.db.query('SELECT * FROM users;');
    this.users.set(users.values || []);
  }

  // CREATE CRUD OPERATIONS
  async createUser(name: string, active: string) {
    const result = await this.db.run(
      `
      INSERT INTO users (name, active) VALUES (?, ?);
    `,
      [name, active]
    );
    await this.loadUsers();
    return result;
  }

  async updateUser(user: User) {
    const active = user.active ? '1' : '0';

    const result = await this.db.run(
      `

      UPDATE users SET name = ?, active = ? WHERE id = ?;
    `,
      [user.name, active, user.id]
    );
    await this.loadUsers();
    return result;
  }

  async deleteUser(user: User) {
    const result = await this.db.run(
      `

      DELETE FROM users WHERE id = ?;
    `,
      [user.id]
    );
    await this.loadUsers();
    return result;
  }

  getUsers() {
    return this.users;
  }

  constructor() {}
}
