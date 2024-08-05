import { Link } from "react-router-dom";

const EscalationItem = ({ escalation }: { escalation: Escalation }) => {
  return (
    <div>
      <div className=" bg-blue-600 mt-5 rounded-xl sm:min-w-[500px] md:min-w-[700px] pb-5">
        <Link to={`./${escalation._id}`}>
          <div className="flex items-center justify-start">
            <h3 className=" text-m my-2 mr-5 text-red-300">Title:</h3>
            <div className="text-slate-200">{escalation.title}</div>
          </div>
          <div className=" text-2xl my-2 text-red-400">Question:</div>
        </Link>
        <div className=" h-[75px] text-2xl bg-blue-500 rounded-xl">
          <Link to={`./${escalation._id}`}>
            {escalation.body?.slice(0, 50) + "..."}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EscalationItem;
