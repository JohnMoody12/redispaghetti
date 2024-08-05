import EscalationItem from "./EscalationItem";

const EscalationListByProduct = ({ escalations }: { escalations: any }) => {
  return (
    <div>
      {" "}
      <ul className="p-3 text-slate-100 w-100vw m:w-[50vw]">
        {escalations.map((escalation: any) => (
          <EscalationItem escalation={escalation} key={escalation._id} />
        ))}
      </ul>
    </div>
  );
};
export default EscalationListByProduct;
