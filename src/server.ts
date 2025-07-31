import express from 'express';
import { attachDb } from './middleware/db/attachDb';

const app = express();
app.use(express.json());
app.use(attachDb());

// Example route using transaction
app.post('/users', async (req, res) => {
    try {
        const { email, password } = req.body;

        await req.db.query(
            'INSERT INTO "User" (email, password, "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW())',
            [email, password]
        );


        res.status(201).json({ message: 'User created' });
    } catch (err) {
        await req.db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


app.get('/created_tasks', async (req, res) => {
    try {
        const result = await req.db.query(`
            SELECT 
              "Task".id AS task_id,
              "Task".title,
              "Task"."createdAt" AS task_created_at,
              "User".id AS user_id,
              "User".email,
              "User"."createdAt" AS user_created_at
            FROM "Task"
            JOIN "User" ON "Task"."ownerId" = "User".id;
          `);

        res.status(200).json({
            message: 'Fetched tasks with users',
            data: result.rows,
        });
    }

    catch (err) {
        await req.db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
