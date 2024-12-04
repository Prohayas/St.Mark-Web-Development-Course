export type TodosType = {
  id: number;
  completed: boolean;
  title: string | undefined;
  isEditing: boolean;
};

export type UsersType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type PostsType = {
  id: number;
  body: string;
  title: string;
};
