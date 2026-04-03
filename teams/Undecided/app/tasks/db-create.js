import { db } from "../db.js";

db.exec(` 
    DROP TABLE IF EXISTS saving_entries;
    DROP TABLE IF EXISTS daily_summary;
    DROP TABLE IF EXISTS transactions;
    DROP TABLE IF EXISTS saving_goals;
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS users;


     CREATE TABLE users (
     user_id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT NOT NULL UNIQUE,
     hashedPassword TEXT NOT NULL,
     email TEXT NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     CREATE TABLE sessions (
     id TEXT PRIMARY KEY,
     user_id INTEGER NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
     );
 
     CREATE TABLE saving_goals(
     goal_id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER, 
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     completion_status INTEGER DEFAULT 0 CHECK(completion_status IN (0,1)),
     target_amount INTEGER NOT NULL CHECK(target_amount >= 0),
     goal_name TEXT NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE

    );

     CREATE TABLE saving_entries (
     saving_entry_id INTEGER PRIMARY KEY AUTOINCREMENT,  
     goal_id INTEGER,
     amount INTEGER NOT NULL CHECK(amount >= 0),
     date TEXT NOT NULL,
     FOREIGN KEY (goal_id) REFERENCES saving_goals(goal_id) ON DELETE CASCADE
     );


     CREATE TABLE transactions(
     transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     category TEXT NOT NULL CHECK(category IN('Food','Transportation','Communication','Housing',
     'Personal Care','Health and Wellness','Education','Entertainment' ,'Debt Payments','Pets','Others')),
     type TEXT CHECK(type IN('expense', 'income')) NOT NULL,
     transaction_date TEXT NOT NULL,
     amount INTEGER NOT NULL CHECK(amount >= 0),
     description TEXT NOT NULL,
     reflection_note TEXT, 
     mood TEXT,
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
     );

     CREATE TABLE daily_summary(
     daily_total_id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER, 
     date TEXT NOT NULL,
     target_spent_total INTEGER CHECK(target_spent_total >= 0), 
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     UNIQUE(user_id, date),
     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
     );

     INSERT INTO users (username, hashedPassword, email) VALUES
        ('testuser', 'hashedpassword123', 'testuser@example.com'),  
        ('user2', 'hashedpassword456', 'user2@example.com'),
        ('user3', 'hashedpassword789', 'user3@example.com');

     INSERT INTO transactions (user_id, category, type, transaction_date, amount, description, reflection_note, mood) VALUES
        (1, 'Food', 'expense', '2024-06-01', 15, 'Lunch at cafe', 'Could have made a sandwich at home', 'neutral'),
        (1, 'Transportation', 'expense', '2024-06-02', 50, 'Monthly bus pass', 'Good investment for the month', 'happy'),
        (1, 'Entertainment', 'expense', '2024-06-03', 30, 'Movie night with friends', 'Had a great time!', 'happy'),
        (1, 'Health and Wellness', 'expense', '2024-06-04', 20, 'Gym membership', 'Need to stay active', 'neutral'),
        (1, 'Education', 'expense', '2024-06-05', 100, 'Online course', 'Investing in my skills', 'happy');


`);
