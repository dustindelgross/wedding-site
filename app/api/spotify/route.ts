import { NextResponse, NextRequest } from "next/server";
import { sql, db } from '@vercel/postgres';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { URL } from "url";

async function getToken() {

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials'
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        }
    });

    return await response.json();
}

async function getPlaylist(access_token: string, tracks: boolean) {

    let url = `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}`;

    if (tracks) {
        url += `/tracks`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token }
    });

    return await response.json();
}

async function addTracks(access_token: string, tracks: string[]) {

    const response = await fetch(`https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: tracks
        })
    });

    return await response.json();
}

async function search( access_token: string, query: string ) {

    let terms = encodeURI(query);
    const response = await fetch(`https://api.spotify.com/v1/search?q=${terms}&type=artist`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token }
    });

    return await response.json();
}

export const GET = withApiAuthRequired(async function getSpotify(req: NextRequest) {

    const res = new NextResponse();
    const session = await getSession(req, res);
    const { searchParams } = new URL(req.url);
    const getParams = {
        playlist: Boolean(searchParams.get('playlist')),
        tracks: Boolean(searchParams.get('tracks')),
        search: searchParams.get('search')
    };

    if (!session) {
        return NextResponse.json({ error: "Gotta be logged in, bud." });
    }

    if (getParams.search) {

        getToken().then(res => {
            search(res.access_token, getParams.search as string).then(results => {
                return NextResponse.json(results);
            })
        })

    }

    if (getParams.playlist) {

        getToken().then(res => {
            getPlaylist(res.access_token, true).then(playlist => {
                console.log(playlist)
                return NextResponse.json(playlist);
            })
        })

    }

    return NextResponse.json({});

});

export const POST = withApiAuthRequired(async function addToPlaylist(req: NextRequest) {

    const res = new NextResponse();
    const session = await getSession(req, res);
    const body = await req.json();

    if (!session) {
        return NextResponse.json({ error: "Gotta be logged in, bud." });
    }

    const tracks = body.tracks;

    if (tracks) {

        getToken().then(res => {

            let prepared: string[] = tracks.map((track: string) => {
                return "spotify:track:" + track;
            });



            addTracks(res.access_token, prepared).then(playlist => {
                
                return NextResponse.json(playlist);
            })

        });

    }

    return NextResponse.json({})

});

/*
async function getToken() {

   const fetching = await fetch('/api/spotify');

  console.log(fetching.json())
  return fetching;

  console.log(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET) 



  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from( process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    }

  });

  return await response.json();

}

async function getPlaylist(access_token: string) {

  const response = await fetch('https://api.spotify.com/v1/playlists/process.env.SPOTIFY_PLAYLIST_ID', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token }
  });

  return await response.json();
} */