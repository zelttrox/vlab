import { Pool } from 'pg'
import * as logs from "../beta/logs"
import { vlab } from '../core/handlers'

const pool = new Pool({
    connectionString: 'postgresql://postgres.wvnhlvahzgolbtojioxf:lY0eCLfzCCOEsM6d@aws-1-eu-central-1.pooler.supabase.com:5432/postgres'
})

// Report a bug to the database
export default async function ReportBug(title: string) {
    try {
        const result = await pool.query(
            'INSERT INTO bugs (title, last_action, current_lab, history) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, logs.lastAction, vlab.GetCurrentLab(), logs.ReadLogs()]
        );
        console.log("Bug reported, thanks!");
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        return null;
    }
}