
interface MenuitemsType {
  [x: string]: any;
  id?: string | number;
  navlabel?: boolean;
  usuario_tipo_id?: number[],
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {

  IconDualScreen,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
const Menuitems: MenuitemsType[] = [
  {
    id: 1,
    title: 'Painel',
    usuario_tipo_id: [1, 2, 3],
    icon: IconDualScreen,
    href: '/',
  },
  {
    id: 2,
    title: 'Usuários',
    icon: IconUsers,
    usuario_tipo_id: [1, 2],
    href: '/usuarios',
  },
  {
    id: 3,
    title: 'Meu perfil',
    icon: IconUser,
    usuario_tipo_id: [1, 2, 3],
    href: '/meu-perfil',
  },
];

export default Menuitems;
