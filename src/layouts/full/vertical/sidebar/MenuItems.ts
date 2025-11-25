
interface MenuitemsType {
  [x: string]: any;
  id?: string | number;
  navlabel?: boolean;
  usuario_tipo_id?: string[],
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
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react';
const Menuitems: MenuitemsType[] = [
  {
    id: 1,
    title: 'Painel',
    usuario_tipo_id: ["a61b6f23-cdc0-4b79-b372-3b02f6ac0c93", "be506f43-742c-4b04-b288-6bd2e6ffd07e", "fbf94274-9a4b-4372-90a3-b5ff10612a90"],
    icon: IconDualScreen,
    href: '/',
  },
  {
    id: 2,
    title: 'Usuários',
    icon: IconUsers,
    usuario_tipo_id: ["a61b6f23-cdc0-4b79-b372-3b02f6ac0c93", "fbf94274-9a4b-4372-90a3-b5ff10612a90"],
    href: '/usuarios',
  },
  {
    id: 3,
    title: 'Meu perfil',
    icon: IconUser,
    usuario_tipo_id: ["a61b6f23-cdc0-4b79-b372-3b02f6ac0c93", "be506f43-742c-4b04-b288-6bd2e6ffd07e", "fbf94274-9a4b-4372-90a3-b5ff10612a90"],
    href: '/meu-perfil',
  },
  {
    id: 4,
    title: 'Configurações de perfis',
    icon: IconUserCog,
    usuario_tipo_id: ["a61b6f23-cdc0-4b79-b372-3b02f6ac0c93", "fbf94274-9a4b-4372-90a3-b5ff10612a90"],
    href: '/configuracoes-perfis',
  },
];

export default Menuitems;
