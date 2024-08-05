import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../DataContext";
import CommentCard from "./CommentCard";

const EscalationPage = () => {
  const { escalationId } = useParams();

  const { escalations, thisEscalation, setThisEscalation } =
    useContext(DataContext);

  useEffect(() => {
    let temp = escalations.filter((esc: any) => esc._id == escalationId);
    setThisEscalation(temp[0] || []);
  }, []);
  return (
    <div className="flex flex-col items-center py-3 text-white flex-grow bg-slate-800">
      <div>Title: {thisEscalation.title}</div>
      <div>Body: {thisEscalation.body}</div>
      <div>Comments:</div>
      <ul className="p-3 text-slate-100 w-100vw m:w-[50vw]">
        {thisEscalation.comments?.length > 0 &&
          thisEscalation.comments?.map((comment: any) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </ul>
    </div>
  );
};
export default EscalationPage;
