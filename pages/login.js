import Layout from "@/layout/layout";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import LoginValidate from "@/lib/validate";
import { useRouter } from "next/router";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const onSubmit = async (values) => {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    if (status.ok) {
      router.push(status.url);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: LoginValidate,
    onSubmit,
  });

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };
  const handleGithubSignIn = async () => {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-7">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold my-4">Explore</h1>
          <p className="w-3/4 mx-auto text-grey-400">
            Lorem ipsum dolor sit amet, odio tibique neglegentur id est.
          </p>
        </div>
        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-red-500"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <MdAlternateEmail size={25} />
            </span>
          </div>
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-red-500"
                : ""
            }`}
          >
            <input
              className={styles.input_text}
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <span className="flex items-center px-4">
              <MdPassword
                size={25}
                onClick={() => setShow(!show)}
                className="hover:text-indigo-500 cursor-pointer"
              />
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign in
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={styles.button_custom}
            >
              Sign in with Google <FcGoogle size={25} />
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGithubSignIn}
              className={styles.button_custom}
            >
              Sign in with Github <FaGithub size={25} />
            </button>
          </div>
        </form>
        {/* bottom */}
        <p className="text-center text-gray-400">
          Don't have an account yet?
          <br />
          <Link href="/register" className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Login;
