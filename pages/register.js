import Layout from "@/layout/layout";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "@/lib/validate";
import { useRouter } from "next/router";

const Register = () => {
  const [show, setShow] = useState({ password: false, cPassword: false });
  const router = useRouter();

  const onSubmit = async (values) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000");
      });
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });
  return (
    <>
      <Layout>
        <Head>
          <title>Register</title>
        </Head>
        <section className="w-3/4 mx-auto flex flex-col gap-5">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold my-4">Register</h1>
            <p className="w-3/4 mx-auto text-grey-400">
              Lorem ipsum dolor sit amet, odio tibique neglegentur id est.
            </p>
          </div>
          {/* form */}
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type="text"
                name="Username"
                placeholder="Username"
                {...formik.getFieldProps("username")}
              />
              <span className="icon flex items-center px-4">
                <FaRegUser size={25} />
              </span>
            </div>
            {formik.errors.username && formik.touched.username ? (
              <span className="text-xs text-red-500">
                {formik.errors.username}
              </span>
            ) : (
              ""
            )}
            <div className={styles.input_group}>
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
            {formik.errors.email && formik.touched.email ? (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            ) : (
              ""
            )}
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type={`${show.password ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <span className="flex items-center px-4">
                <MdPassword
                  size={25}
                  onClick={() => setShow({ ...show, password: !show.password })}
                  className="hover:text-indigo-500 cursor-pointer"
                />
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <span className="text-xs text-red-500">
                {formik.errors.password}
              </span>
            ) : (
              ""
            )}
            <div className={styles.input_group}>
              <input
                className={styles.input_text}
                type={`${show.cPassword ? "text" : "password"}`}
                name="cPassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps("cPassword")}
              />
              <span className="flex items-center px-4">
                <MdPassword
                  size={25}
                  onClick={() =>
                    setShow({ ...show, cPassword: !show.cPassword })
                  }
                  className="hover:text-indigo-500 cursor-pointer"
                />
              </span>
            </div>
            {formik.errors.cPassword && formik.touched.cPassword ? (
              <span className="text-xs text-red-500">
                {formik.errors.cPassword}
              </span>
            ) : (
              ""
            )}
            <div className="input-button">
              <button type="submit" className={styles.button}>
                Sign Up
              </button>
            </div>
          </form>
          {/* bottom */}
          <p className="text-center text-gray-400">
            Have an account?
            <br />
            <Link href="/login" className="text-blue-700">
              Sign in
            </Link>
          </p>
        </section>
      </Layout>
    </>
  );
};

export default Register;
