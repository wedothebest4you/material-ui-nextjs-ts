import { SvgIconOwnProps } from '@mui/material/SvgIcon';

import SvgIcon from '@mui/material/SvgIcon';

export default function ScvgTextIcon({
  size,
  initials,
}: {
  size: SvgIconOwnProps['fontSize'];
  initials: string;
}) {
  return (
    <SvgIcon fontSize={size} viewBox="0 0 24 24">
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
      >
        {initials}
      </text>
    </SvgIcon>
  );
}
