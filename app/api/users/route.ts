import { NextResponse, NextRequest } from "next/server";
import { sql, db } from '@vercel/postgres';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

interface User {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    rsvp?: boolean;
    rehearsal_invite?: boolean;
    diet_restrictions?: string[];
    song_recs?: string[];
}

const adminRoles = ['bride', 'groom', 'wedding_planner', 'admin'];

export const GET = withApiAuthRequired(async function getUsers(req: NextRequest) {

    const res = new NextResponse();
    const session = await getSession(req, res);
    const { searchParams } = new URL(req.url);
    const getParams = {
        id: searchParams.get('id'),
        name: searchParams.get('name'),
        email: searchParams.get('email'),
        role: searchParams.get('role'),
        rsvp: searchParams.get('rsvp'),
        rehearsal_invite: searchParams.get('rehearsal_invite'),
        diet_restrictions: searchParams.get('diet_restrictions'),
        song_recs: searchParams.get('song_recs'),
        list: searchParams.get('list'),
        limit: searchParams.get('limit'),
        offset: searchParams.get('offset')
    }

    if (!session) {
        return NextResponse.json({ error: "Gotta be logged in, bud." });
    }

    let users;

    if (getParams.id) {
        users = await sql`
            SELECT *
            FROM users
            WHERE id = ${parseInt(getParams.id as string)}`;

        return NextResponse.json(users);
    }

    if (getParams.name) {
        users = await sql`
            SELECT *
            FROM users
            WHERE name LIKE ${getParams.name}%`;

        return NextResponse.json(users);
    }

    if (getParams.email) {
        users = await sql`
            SELECT *
            FROM users
            WHERE email = ${getParams.email}`;

        return NextResponse.json(users);
    }

    if (getParams.role) {
        users = await sql`
            SELECT *
            FROM users
            WHERE role = ${getParams.role}`;

        return NextResponse.json(users);
    }

    if (getParams.rsvp) {
        users = await sql`
            SELECT *
            FROM users
            WHERE rsvp = ${getParams.rsvp}`;

        return NextResponse.json(users);
    }

    if (getParams.rehearsal_invite) {
        users = await sql`
            SELECT *
            FROM users
            WHERE rehearsal_invite = ${getParams.rehearsal_invite}`;

        return NextResponse.json(users);
    }

    if (getParams.diet_restrictions) {
        users = await sql`
            SELECT *
            FROM users
            WHERE diet_restrictions IN (${getParams.diet_restrictions})`;

        return NextResponse.json(users);
    }

    if (getParams.song_recs) {
        users = await sql`
            SELECT *
            FROM users
            WHERE song_recs IN (${getParams.song_recs})`;

        return NextResponse.json(users);
    }



    if (getParams.list) {
        users = await sql`
            SELECT *
            FROM users
            LIMIT ${parseInt(getParams.limit as string)} OFFSET ${parseInt(getParams.offset as string)}`;

        return NextResponse.json(users);
    }

    users = await sql`
        SELECT *
        FROM users
        WHERE email = ${session?.user.email}`;

    return NextResponse.json(users);

});


export const PUT = withApiAuthRequired(async function updateUser(req: NextRequest) {

    const res = new NextResponse();
    const body = await req.json();
    const session = await getSession(req, res);

    if (!session) {
        return NextResponse.json({ error: "Gotta be logged in, friend." });
    }

    if (!body) {
        return NextResponse.json({ error: "Good job hiding the body." });
    }

    if (!body.id) {
        return NextResponse.json({ error: "ID is required." });
    }

    let set: User = {
        id: body.id
    };

    const user = await sql`
        SELECT *
        FROM users
        WHERE id = ${body.id}`;

    const sessionUser = await sql`
            SELECT *
            FROM users
            WHERE email = ${session.user.email}`;

    if (body.name) {
        set.name = body.name;
    }

    if (body.rsvp === undefined || body.rsvp === null) {
        set.rsvp = user.rows[0].rsvp;
    } else {

        if (session.user.email !== user.rows[0].email) {

            if (!sessionUser) {
                return NextResponse.json({ error: "User not found." });
            }

            if (!adminRoles.includes(sessionUser.rows[0].role)) {
                return NextResponse.json({ error: "You don't have permission to update RSVPs." });
            }

        }

        set.rsvp = body.rsvp;

    }

    if (!body.role) {
        set.role = user.rows[0].role;
    } else {
        set.role = body.role;
    }

    if (body.rehearsal_invite === undefined || body.rehearsal_invite === null ) {
        set.rehearsal_invite = user.rows[0].rehearsal_invite;
    } else {

        if (session.user.email !== body.email) {

            if (!sessionUser) {
                return NextResponse.json({ error: "User not found." });
            }

            if (!adminRoles.includes(sessionUser.rows[0].role)) {
                return NextResponse.json({ error: "You don't have permission to update rehearsal invites." });
            }

        }

        set.rehearsal_invite = body.rehearsal_invite;

    }

    if (!body.diet_restrictions) {
        set.diet_restrictions = user.rows[0].diet_restrictions as string[];
    } else {
        set.diet_restrictions = body.diet_restrictions as string[];
    }

    if (!body.song_recs) {
        set.song_recs = user.rows[0].song_recs as string[];
    } else {
        set.song_recs = body.song_recs as string[];
    }

    if (!body.email) {
        set.email = user.rows[0].email;
    } else {
        set.email = body.email;
    }

    const formatArray = (arr: string[]) => `{${arr.map((item) => `"${item}"`).join(', ')}}`;

    const exec = await sql`
    UPDATE users 
    SET name = ${set.name}, 
    email = ${set.email}, 
    rsvp = ${set.rsvp}, 
    role = ${set.role?.toLowerCase()},
    rehearsal_invite = ${set.rehearsal_invite}, 
    diet_restrictions = ${formatArray(set.diet_restrictions)}, 
    song_recs = ${formatArray(set.song_recs)} 
    WHERE id = ${set.id}`;

    console.log(exec)

    return NextResponse.json(exec);
    return NextResponse.json({ error: "Failed to update user." });

});

export const POST = withApiAuthRequired(async function createUser(req: NextRequest) {

    const res = new NextResponse();
    const body = await req.json();
    const session = await getSession(req, res);
    const formatArray = (arr: string[]) => `{${arr.map((item) => `"${item}"`).join(', ')}}`;

    if (!session) {
        return NextResponse.json({ error: "Gotta be logged in, friend." });
    }

    if (!body) {
        return NextResponse.json({ error: "Good job hiding the body." });
    }


    let post: User = {};

    const sessionUser = await sql`
            SELECT *
            FROM users
            WHERE email = ${session.user.email}`;

    if (body.name) {
        post.name = body.name;
    }

    if (!body.email) {

        return NextResponse.json({ error: "Email is required." });

    } else {

        let user = await sql`SELECT * FROM users WHERE email = ${body.email}`;

        if (user.rows[0]) {
            return NextResponse.json({ error: "User already exists." });
        }

        let rx = new RegExp(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}`);

        if (!rx.test(body.email)) {
            return NextResponse.json({ error: "Invalid email." });
        }

        post.email = body.email;

    }

    if (!body.rsvp) {
        post.rsvp = false;
    } else {
        post.rsvp = body.rsvp;
    }

    if (!body.rehearsal_invite) {
        post.rehearsal_invite = false;
    } else {

        if (!adminRoles.includes(sessionUser.rows[0].role)) {
            return NextResponse.json({ error: "You don't have permission to update rehearsal invites." });
        }

        post.rehearsal_invite = body.rehearsal_invite;

    }

    if (!body.role) {
        post.role = 'guest';
    } else {

        if (!adminRoles.includes(sessionUser.rows[0].role)) {
            return NextResponse.json({ error: "You don't have permission to update roles." });
        }

        post.role = body.role;

    }

    if (!body.diet_restrictions) {
        post.diet_restrictions = [];
    } else {
        post.diet_restrictions = body.diet_restrictions as string[];
    }

    if (!body.song_recs) {
        post.song_recs = [];
    } else {
        post.song_recs = body.song_recs as string[];
    }

    const exec = await sql`
    INSERT INTO users ( 
        name, 
        email, 
        role,
        rsvp, 
        rehearsal_invite, 
        diet_restrictions, 
        song_recs 
    )
    VALUES (
        ${post.name}, 
        ${post.email}, 
        ${post.role},
        ${post.rsvp}, 
        ${post.rehearsal_invite}, 
        ${formatArray(post.diet_restrictions)},
        ${formatArray(post.song_recs)}
    )`;

    return NextResponse.json(exec);

});

export const DELETE = withApiAuthRequired(async function deleteUser(req: NextRequest) {

    const res = new NextResponse();
    const body = await req.json();
    const session = await getSession(req, res);

    if (!session) {
        return NextResponse.json({ error: "Gotta be logged in, friend." });
    }

    if (!body) {
        return NextResponse.json({ error: "Good job hiding the body." });
    }


    let del: User = {};

    const sessionUser = await sql`
            SELECT *
            FROM users
            WHERE email = ${session.user.email}`;

    if (!adminRoles.includes(sessionUser.rows[0].role)) {
        return NextResponse.json({ error: "You don't have permission to delete users." });
    }

    if (body.id === sessionUser.rows[0].id) {
        return NextResponse.json({ error: "You can't delete yourself." });
    }

    if (!body.id) {
        return NextResponse.json({ error: "ID is required." });
    } else {
        del.id = body.id;
    }

    const user = await sql`
        SELECT *
        FROM users
        WHERE id = ${del.id}`;

    if (!user.rows[0]) {
        return NextResponse.json({ error: "User not found." });
    }

    const exec = await sql`
    DELETE FROM users 
    WHERE id = ${del.id}`;

    return NextResponse.json(exec);

});