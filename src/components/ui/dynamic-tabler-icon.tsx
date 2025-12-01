import * as allIcons from '@tabler/icons-react';

type TablerIconComponent = React.FC<any>;

export type TablerIconName = {
  [K in keyof typeof allIcons]: (typeof allIcons)[K] extends TablerIconComponent ? K : never;
}[keyof typeof allIcons];

interface DynamicIconProps {
  icon: TablerIconName;
  size?: number;
  color?: string;
}

export const DynamicTablerIcon = ({ icon, size = 22, color, ...rest }: DynamicIconProps) => {
  const Icon = allIcons[icon];

  if (!Icon) {
    console.warn(`Ícone "${icon}" não encontrado.`);
    return null;
  }

  return <Icon size={size} color={color} {...rest} />;
};
