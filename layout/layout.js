import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen bg-blue-400">
        <div className="m-auto bg-slate-50 rounded-md w-3/5 grid lg:grid-cols-2">
          <div className={styles.imgStyle}>
            <div className={styles.cartoonImg}>
              <img
                src="/assets/img2.png"
                alt="img2"
                className="w-full h-full pt-10"
              />
            </div>
            <div className={styles.cloud_one} />
            <div className={styles.cloud_two} />
          </div>
          <div className="right flex flex-col justify-evenly">
            <div className="text-center py-10">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
