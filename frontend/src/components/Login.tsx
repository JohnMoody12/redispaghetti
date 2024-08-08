import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let username = data.get("username") as string;
    let password = data.get("password") as string;
    let userLogin = {
      username,
      password,
    };

    try {
      const response = await fetch(`http://localhost:5002/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
        credentials: "include",
      });
      const result = await response.json();
      console.log("Created " + result);
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>User Login</div>
      <form className="p-3" onSubmit={handleSubmit}>
        <label htmlFor="username" className="text-white mr-3">
          User
        </label>
        <input type="text" name="username" id="username" required />
        <br />
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          className="mt-3"
          required
        />
        <br />
        <br />
        <button
          type="submit"
          className="text-white bg-slate-900 mt-5 rounded-lg w-[300px]"
        >
          Submit!
        </button>
      </form>
    </div>
  );
};
export default Login;
