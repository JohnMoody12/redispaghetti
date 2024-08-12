import EmptyCard from "./EmptyCard";

const EscalationListEmpty = () => {
  let arr = [1, 2, 3];

  return (
    <div>
      {" "}
      <ul className="p-3 text-slate-100 w-100vw m:w-[50vw]">
        {arr.map((_item) => (
          <EmptyCard />
        ))}
      </ul>
    </div>
  );
};
export default EscalationListEmpty;
