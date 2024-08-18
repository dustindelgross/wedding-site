import { sql } from '@vercel/postgres';

export type User = {
    id?: number;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    rsvp?: boolean | null;
    diet_restrictions?: string[];
    song_recs?: string[];
    rehearsal_invite?: boolean;
}

export type UserGetOptions = {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    rsvp?: boolean;
    diet_restrictions?: string[];
    song_recs?: string[];
    rehearsal_invite?: boolean;
    limit?: number;
    offset?: number;
    list?: boolean;
    playlist?: boolean;
    track?: string;
    tracks?: boolean;
    search?: string;
}

interface FetchOptions {
    method: string;
    headers: {
        'Content-Type': string;
    }
    body?: string;
}

async function formatFetcher(uri: string, method: string, options?: User | UserGetOptions | null) {

    uri = method === 'GET' && options ? `${uri}?${formatGetParams(options)}` : uri;

    const fetchOptions: FetchOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (method !== 'GET' && options) {
        fetchOptions.body = JSON.stringify(options);
    }

    const response = await fetch(uri, fetchOptions).then((res) => res.json());
    return response;


}

const formatGetParams = (options: UserGetOptions | User) => {
    return Object.entries(options).map(([key, value]) => `${key}=${value}`).join('&');
}

const isUserAdmin = (user: User) => {
    return user.role === 'admin';
}

const createTables = async () => {

    await sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      rsvp BOOLEAN NOT NULL,
      diet_restrictions TEXT[],
      song_recs TEXT[],
      rehearsal_invite BOOLEAN
    )`;

}

export { isUserAdmin, createTables, formatFetcher };