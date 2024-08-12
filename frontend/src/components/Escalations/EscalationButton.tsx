import { Link } from "react-router-dom";

const EscalationButton = ({ productType }: { productType: string }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link to={`/escalations/${productType}`}>
        <button className="bg-[#464d78] w-[250px] h-[250px] rounded-lg text-white hover:bg-blue-600 text-5xl hover:w-[260px] hover:h-[260px]">
          {productType}
        </button>
      </Link>
    </div>
  );
};
export default EscalationButton;
