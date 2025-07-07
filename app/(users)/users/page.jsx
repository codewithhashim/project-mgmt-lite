import CreateUserForm from "@/components/createUserForm"
import { getUsers } from "@/lib/data"

export default async function Users() {
    const users = await getUsers()

    return(
        <section className="container">
            <h1>All users data</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="mt-2 text-sm text-gray-500">
              {user.bio}
            </p>
          </div>
        ))}
      </div>
      <h3> Add a new user</h3>
      <CreateUserForm />
        </section>
    )
}