import { useEffect, useState } from "react";

const Srs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("http://localhost:5002/api/srs", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error(`${response.status}`);
        let srsJson = await response.json();
        console.log(srsJson);
        setData(srsJson);
      } catch (err: any) {
        let no = [
          { name: "no no no", body: "naughty naughty" },
          { name: "no no no", body: "naughty naughty" },
        ];
        console.log(" are we here??");
        setData(no);
      }
    };

    getData();
  }, []);

  return (
    <div>
      Test
      <ul>
        {data.length > 0 &&
          data.map((ele: any) => (
            <li>
              {ele.name} {ele.body}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Srs;
