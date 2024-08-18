"use client";
import { SetStateAction, useEffect, useState, useRef, Dispatch } from "react";
import { User, formatFetcher } from "../components/users/utils";
import { SpringModal } from "../components";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { FiChevronUp, FiTrash, FiCheck, FiX, FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";
import { request } from "https";

const UserDeleteModal = ({ id, deleteOpen, setDeleteOpen, setToDelete }: { id: number, deleteOpen: boolean, setToDelete: Dispatch<SetStateAction<number | null>>, setDeleteOpen: Dispatch<SetStateAction<boolean>> }) => {

  if (!id) return null;
  async function handleDelete() {
    formatFetcher(`/api/users`, 'DELETE', { id: id }).then(() => {
      setToDelete(null);
      window.location.reload();
    });
  }

  function handleDeleteDismiss() {
    setDeleteOpen(false);
    setToDelete(null);
  }

  return (
    <SpringModal
      isOpen={deleteOpen}
      setIsOpen={setDeleteOpen}
      handleConfirm={handleDelete}
      handleDismiss={handleDeleteDismiss}
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Are you sure?</h2>
        <p className="text-gray-600">This action is irreversible.</p>
      </div>
    </SpringModal>
  );
}


const UserFormModal = ({ user, open, setOpen, setUser }: { user: User, open: boolean, setUser: Dispatch<SetStateAction<User | null>>, setOpen: Dispatch<SetStateAction<boolean>> }) => {

  if (!user) return null;
  if (!user.id) return null;

  async function handleUpdate() {
    formatFetcher(`/api/users`, 'PUT', { ...user }).then((data) => {
      setUser(null);
      window.location.reload();
    });
  }

  function handleDismiss() {
    setOpen(false);
    setUser(null);
  }

  return (
    <SpringModal
      isOpen={open}
      setIsOpen={setOpen}
      handleConfirm={handleUpdate}
      handleDismiss={handleDismiss}
    >
      <form
        className={``}
      >
        <div className="flex flex-col items-start w-full">
          <label className="text-gray-200 p-4">Name</label>
          <input type="text" className="w-full rounded-md bg-blue-50 font-bold text-gray-900 p-4" value={user.name!} onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }} />
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="text-gray-200 p-4">Email</label>
          <input type="text" className="w-full rounded-md bg-blue-50 font-bold text-gray-900 p-4" value={user.email!} onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }} />
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="text-gray-200 p-4">Role</label>
          <select className="appearance-none w-full rounded-md bg-blue-50 font-bold text-gray-900 p-4" value={user.role!} onChange={(e) => {
            setUser({ ...user, role: e.target.value });
          }}>
            <option value="guest">Guest</option>
            <option value="bride">Bride</option>
            <option value="groom">Groom</option>
            <option value="wedding_party">Wedding Party</option>
            <option value="wedding_planner">Wedding Planner</option>
            <option value="family">Family</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-row-reverse justify-end items-center w-full">
          <label className="text-gray-200 p-4">RSVP</label>
          <input type="checkbox" className="p-4 rounded-sm min-w-[20px] aspect-ratio-1/1" checked={user.rsvp!} onChange={(e) => {
            setUser({ ...user, rsvp: e.target.checked });
          }} />
        </div>
        <div className="flex flex-row-reverse justify-end items-center w-full">
          <label className="text-gray-200 p-4">Rehearsal Invite</label>
          <input type="checkbox" className="p-4 rounded-sm min-w-[20px] aspect-ratio-1/1" checked={user.rehearsal_invite!} onChange={(e) => {
            setUser({ ...user, rehearsal_invite: e.target.checked });
          }} />
        </div>
      </form>
    </SpringModal>
  );
}

const TableRow = ({ user, setUser, setOpen, setToDelete, setDeleteOpen }: { user: User, setUser: Dispatch<SetStateAction<User | null>>, open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, setToDelete: Dispatch<SetStateAction<number | null>>, setDeleteOpen: Dispatch<SetStateAction<boolean>> }) => {

  if (!user) return null;

  if (!user.id) return null;

  return (
    <>
      <motion.tr
        layoutId={`row-${user.id}`}
        className={`text-sm bg-white`}
      >
        <td className="pl-4 text-lg">
          <button
            className="hover:text-violet-600 transition-colors duration-300"
            onClick={() => {
              setOpen(true);
              setUser(user);
            }}
          >
            <FiEdit />
          </button>
        </td>

        <td className="p-4 flex items-center gap-3 overflow-hidden">
          <div>
            <span className="block mb-1 font-medium">{user.name}</span>
            <span className="block text-xs text-slate-500">{user.email}</span>
          </div>
        </td>
        <td className="p-4">
          <div>
            <span className="block mb-1 font-medium capitalize">{user.role?.replace('_', ' ')}</span>
          </div>
        </td>

        <td className="p-4">
          <div
            className={`flex items-center gap-2 font-medium`}
          >
            <span>{user.rsvp === true ? <FiCheck /> : <FiX />}</span>
          </div>
        </td>

        <td className="p-4">
          <div
            className={`flex items-center gap-2 font-medium capitalize`}
          >
            <span>{user.diet_restrictions?.length ? user.diet_restrictions.join(', ') : 'None'}</span>
          </div>
        </td>

        <td className="p-4">
          <div
            className={`flex items-center gap-2 font-medium`}
          >
            <span>{user.song_recs?.length ? <button
              className="border border-slate-200 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors duration-300"
              onClick={() => { }}>View</button> : 'None'}</span>
          </div>
        </td>

        <td className="p-4">
          <div
            className={`flex items-center gap-2 font-medium`}
          >
            <span>{user.rehearsal_invite === true ? <FiCheck /> : <FiX />}</span>
          </div>
        </td>
        <td className="p-4">
          <button
            className="text-red-600 border border-red-600 px-2 py-1 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300"
            onClick={() => {
              setToDelete(user.id!);
              setDeleteOpen(true);
            }}
          >
            <FiTrash />
          </button>
        </td>
      </motion.tr>
    </>
  );
};

async function getToken() {

  /* const fetching = await fetch('/api/spotify');

  console.log(fetching.json())
  return fetching;

  console.log(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET) */



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

}/* 

async function getPlaylist(access_token: string) {

  const response = await fetch('https://api.spotify.com/v1/playlists/process.env.SPOTIFY_PLAYLIST_ID', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token }
  });

  return await response.json();
} */

export default withPageAuthRequired(function Admin() {

  const [editUser, setEditUser] = useState<User | null>(null);
  const [toDelete, setToDelete] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { user, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const adminRoles = ['admin', 'groom', 'bride', 'wedding_planner'];

  useEffect(() => {
    formatFetcher(`/api/users`, 'GET', {
      list: true,
      limit: 75,
      offset: 0,
    }).then((data) => {
      setUsers(data.rows as User[]);
    });
  }, [editUser]);

  useEffect(() => {
    if (user && !isLoading) {
      formatFetcher(`/api/users`, 'GET', { email: user.email }).then((data) => {
        let fetchedUser = data.rows[0] as User;
        if (!fetchedUser) {
          return;
        }
        setCurrentUser(fetchedUser);
      });
    }
   /*  formatFetcher('/api/spotify', 'GET', {
      search: 'hozi'
    }).then(data => {
      console.log(data)
    }) */
  }, [user, isLoading]);

  return (
    <main className="flex min-h-screen flex-col items-start gap-12 py-48 px-24">
      <div className="flex flex-col justify-center gap-6">

        {/* Additional check here to make sure the user is an admin */}
        {currentUser && adminRoles.includes(currentUser.role!) && (
          <>
            <h1 className="text-4xl font-bold text-center max-w-[75ch]">Dashboard</h1>

            <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
                    <th className="text-start p-4 font-medium"></th>
                    <th className="text-start p-4 font-medium">{`Name`}</th>
                    <th className="text-start p-4 font-medium">{`Role`}</th>
                    <th className="text-start p-4 font-medium">{`RSVP'd`}</th>
                    <th className="text-start p-4 font-medium">{`Diet Restrictions`}</th>
                    <th className="text-start p-4 font-medium">{`Song Recs`}</th>
                    <th className="text-start p-4 font-medium">{`Brunch Invite`}</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => {
                    return (

                      <TableRow
                        key={user.id}
                        user={user}
                        setUser={setEditUser}
                        open={open}
                        setOpen={setOpen}
                        setToDelete={setToDelete}
                        setDeleteOpen={setDeleteOpen}
                      />
                    );
                  })}
                </tbody>
              </table>
              <UserFormModal user={editUser!} open={open} setUser={setEditUser} setOpen={setOpen} />
              <UserDeleteModal id={toDelete!} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} setToDelete={setToDelete} />
            </div>
          </>
        )}
      </div>

    </main>
  );
});