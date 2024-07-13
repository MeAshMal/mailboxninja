import React, { useEffect } from "react";
import MenuBar from "../components/Menubar";
import { useNavigate } from "react-router-dom";
import { useLoadUserQuery } from "../redux/services/auth";
import { useAlert } from "react-alert";

const Referral = () => {
  const navigate = useNavigate();
  const previousRoute = () => {
    navigate(-1);
  };
  const result = useLoadUserQuery();
  useEffect(() => {
    if (!result.isSuccess) {
      navigate("/auth");
    }
  }, [result, navigate]);

  const alert = useAlert();

  const copyUrlToClipboard = async () => {
    let string =
      "http://localhost:3000/auth?code=" + result.data?.user?.referralCode;
    await navigator.clipboard.writeText(string);
    alert.success("Copied to clipboard");
  };
  return (
    <main>
      <header className="h-[10vh] text-white bg-neutral-500 flex items-center">
        <span className="mx-7 text-2xl" onClick={previousRoute}>
          <svg
            onClick={previousRoute}
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.09 54.68"
            className="w-2 "
          >
            <defs>
              <style></style>
            </defs>
            <path
              style={{ fill: "#ffffff" }}
              className="cls-1"
              d="M335.08,357.68,313,335.61,334.6,314a2.78,2.78,0,0,0,0-3.92l-.79-.79a2.78,2.78,0,0,0-3.91,0l-24.3,24.3a2.79,2.79,0,0,0,0,3.92l24.78,24.85a2.78,2.78,0,0,0,3.91,0l.79-.79A2.78,2.78,0,0,0,335.08,357.68Z"
              transform="translate(-304.8 -308.51)"
            />
          </svg>
        </span>
        <p>Referral System</p>
      </header>
      <MenuBar />
      <section className="flex justify-center items-center h-[75vh]">
        <div className="border border-black p-4 flex gap-3">
          <span className="underline">
            {"http://localhost:3000/auth?code=" +
              result.data?.user?.referralCode}
          </span>
          <div className="cursor-pointer" onClick={copyUrlToClipboard}>
            📋
          </div>
        </div>
      </section>
    </main>
  );
};

export default Referral;
