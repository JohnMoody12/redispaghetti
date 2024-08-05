const CommentCard = ({ comment }: { comment: any; key: any }) => {
  let newName = comment?.user[0]?.toUpperCase() + comment?.user?.slice(1);
  return (
    <li>
      <div className="bg-blue-600 mt-5 rounded-xl md:min-w-[700px] pb-5 min-h-[150px] flex flex-col">
        <div className="mt-3 mb-5 ml-2">{newName}</div>
        <div className="ml-2 my-2">{comment?.commentBody}</div>
      </div>
    </li>
  );
};
export default CommentCard;
