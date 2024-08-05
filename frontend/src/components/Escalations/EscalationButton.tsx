import { Link } from "react-router-dom";

const EscalationButton = ({ productType }: { productType: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link to={`/escalations/${productType}`}>
        <button className="bg-slate-300 min-w-[200px] h-[50px] rounded-lg px-2 text-slate-900 hover:bg-blue-400">
          {productType}
        </button>
      </Link>
    </div>
  );
};
export default EscalationButton;
