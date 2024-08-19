import { v4 as uuidv4 } from 'uuid';
export const routes = [
  {
    id: uuidv4(),
    title: "Todos",
    href: '/todos'
  },
  {
    id: uuidv4(),
    title: "Friends",
    href: '/friends'
  },
];