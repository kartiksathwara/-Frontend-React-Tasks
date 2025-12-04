export interface UserAttached {
  name: string;
  email: string;
  phone: string;
  date: string;
}

export interface TodoItem {
  id?: string;
  title: string;
  description: string;
  usersAttached: UserAttached[];
}
