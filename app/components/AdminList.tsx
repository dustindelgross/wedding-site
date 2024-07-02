import { formatFetcher, User } from "./users/utils";

export const AdminList = () => {
    const admins = formatFetcher(`/api/users`, 'GET', {role: 'admin'});

    console.log(admins)

    return (
        <>
            {/* {admins?.data?.rows && (
                admins.data.rows.map((admin: User) => {
                    return (
                        <div key={admin.id}>
                            <h3>{admin.name}</h3>
                            <p>{admin.email}</p>
                            <p>{admin.role}</p>
                        </div>
                    )
                })
            )} */}
        </>
    );

}

export default AdminList;