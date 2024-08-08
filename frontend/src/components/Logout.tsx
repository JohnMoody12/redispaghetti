import { useNavigate } from "react-router-dom";

const Logout = () => {
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        nav("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};
export default Logout;
