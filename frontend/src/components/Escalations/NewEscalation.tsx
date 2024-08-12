import { useState } from "react";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_GATEWAY_URL;

const NewEscalation = () => {
  const { productType } = useParams<{ productType: string }>();
  const [test, setTest] = useState("yas");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let title = data.get("title") as string;
    let body = data.get("body") as string;
    let user = data.get("user") as string;
    let newEscalation = {
      productGroup: productType,
      title: title,
      body: body,
      user: user,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `${API_URL}/api/escalations/${productType}/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEscalation),
        }
      );
      const result = await response.json();
      setTest(result);
      console.log("Created " + result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>New {productType} Escalation</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="text-white">
          Title{test}
        </label>
        <input type="text" name="title" id="title" required />
        <br />
        <label htmlFor="body" className="text-white">
          Body{" "}
        </label>
        <input type="text" name="body" id="body" className="mt-3" required />
        <br />
        <label htmlFor="user" className="text-white">
          User{" "}
        </label>
        <input type="text" name="user" id="user" className="mt-3" required />
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
export default NewEscalation;
