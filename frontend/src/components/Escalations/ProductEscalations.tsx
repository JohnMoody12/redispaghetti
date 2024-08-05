import { useContext, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../DataContext";
import EscalationItem from "./EscalationItem";
import { Link } from "react-router-dom";
import EscalationListByProduct from "./EscalationListByProduct";
import EscalationListEmpty from "./EmptyList";

const EscList = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./EscalationListByProduct"));
      }, 2000);
    })
);
// const tempData: Array<Escalation> = [
//   {
//     productGroup: "PXI",
//     title: "ayee",
//     body: "this is a question. it's a really tough question and i need an answer right now. it's a tough question that needs answering, by you, to me, now.",
//     id: 1,
//     comments: [
//       { user: "bob", date: "123", commentBody: "this is a comment", id: 1 },
//       { user: "joe", date: "124", commentBody: "this is a comment 2", id: 2 },
//     ],
//   },
//   {
//     productGroup: "DAQmx",
//     title: "And another",
//     body: "this is a question. it's a really tough question and i need an answer right now. it's a tough question that needs answering, by you, to me, now.",
//     id: 2,
//     comments: [
//       { user: "bob", date: "123", commentBody: "this is a comment 3", id: 3 },
//       { user: "joes", date: "123", commentBody: "this is a comment 3", id: 5 },
//     ],
//   },
//   {
//     productGroup: "DAQmx",
//     title: "And another d",
//     body: "this is a question 22",
//     id: 3,
//     comments: [
//       { user: "bob", date: "123", commentBody: "this is a comment 4", id: 4 },
//       { user: "asdfs", date: "123", commentBody: "this is a comment 4", id: 6 },
//     ],
//   },
// ];

const ProductEscalations = () => {
  const { escalations, setEscalations, isLoading, setIsLoading } =
    useContext(DataContext);
  const { productType } = useParams<{ productType: string }>();

  useEffect(() => {
    setIsLoading(true);
    const fetchEscalations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/escalations/${productType}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("No go");
        }
        const data: Escalation[] = await response.json();
        console.log(data);
        setEscalations(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      fetchEscalations();
    }, 1000);
    //fetchEscalations();
  }, []);
  return (
    <div className="flex flex-col items-center py-2 w-[100vw]">
      <div className="text-red-500">{productType}</div>
      <Link to={`/escalations/${productType}/new`}>
        <button className=" text-white">New</button>
      </Link>
      <div>
        {isLoading ? (
          // <h2 className="text-orange-500">Loading...</h2>
          <EscalationListEmpty />
        ) : (
          <EscalationListByProduct escalations={escalations} />
        )}
      </div>
    </div>
  );
};
export default ProductEscalations;

{
  /* <ul className="p-3 text-slate-100 w-100vw m:w-[50vw]">
{escalations.map((escalation: any) => (
  <EscalationItem escalation={escalation} key={escalation._id} />
))}
</ul> */
}

{
  /* <div className="flex flex-col items-center py-2 w-[100vw]">
<div className="text-red-500">{productType}</div>
<Link to={`/escalations/${productType}/new`}>
  <button className=" text-white">New</button>
</Link>
<div>
  {isLoading ? (
    // <h2 className="text-orange-500">Loading...</h2>
    <EscalationListEmpty />
  ) : (
    <EscalationListByProduct escalations={escalations} />
  )}
</div>
</div> */
}
