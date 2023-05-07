import { getSession, signOut, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      {session ? User({ session, handleSignOut }) : Guest()}
    </>
  );
}

// Guest

const Guest = () => {
  return (
    <>
      <main
        className={` container mx-auto text-center py-20 ${poppins.className}`}
      >
        <h3 className="text-4xl font-bold underline">Guest Homepage</h3>
        <div className="flex justify-center">
          <Link
            href={"/login"}
            className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          >
            Sign in
          </Link>
        </div>
      </main>
    </>
  );
};
// Authorize User

const User = ({ session, handleSignOut }) => {
  return (
    <>
      <main
        className={`container mx-auto text-center py-20 ${poppins.className}`}
      >
        <h3 className="text-4xl font-bold underline capitalize">
          Authorize User Homepage
        </h3>
        <div className="flex justify-center items-center pt-5 flex-col gap-5">
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-30 h-30 rounded-full ring-4 ring-indigo-500"
          />
          <h5 className="text-3xl font-bold ring-4 p-3 ring-indigo-500 rounded-xl">
            User name: {session.user.name}
          </h5>
          <h5 className="text-3xl font-bold ring-4 p-3 ring-indigo-500 rounded-xl">
            E-mail: {session.user.email}
          </h5>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="mt-5 px-5 py-3 rounded-xl bg-indigo-500 text-gray-50"
          >
            Sign Out
          </button>
        </div>
        <div className="flex justify-center">
          <Link
            href={"/profile"}
            className="mt-5 px-10 py-1 rounded-xl bg-indigo-500 text-gray-50"
          >
            Profile Page
          </Link>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
