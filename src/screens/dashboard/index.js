import React from "react";
import { useSetRecoilState } from "recoil";
import { useAuth } from "../../context";
import { Tree } from "../../components";
import { loadingState } from "../../atoms";

export default function Dashboard() {
  const { logout } = useAuth();
  const setLoading = useSetRecoilState(loadingState);

  function handleLogout() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      logout();
    }, 1000);
  }

  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
      <Tree />
      <br />
    </div>
  );
}
