declare global {
  type Escalation = {
    productGroup: string;
    title: string;
    body: string;
    _id: number;
    comments: Comment[] | null;
  };
  type Comment = {
    user: string;
    date: string;
    commentBody: string;
    _id: number;
  };
}

export {};
