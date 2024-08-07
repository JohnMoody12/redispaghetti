import { useEffect, useState } from "react";

const Srs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch("http://localhost:5001/api/srs");
        let srsJson = await response.json();
        setData(srsJson);
      } catch (err) {
        console.log("err", err.message);
      }
    };

    getData();
  }, []);

  return (
    <div>
      Test
      <ul>
        {data.map((ele: any) => (
          <li>
            {ele.name} {ele.body}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Srs;
