import Logo from '@/components/Logo';
import { NavSectionMini } from '@/components/NavSection';
import { NAV } from '@/layouts/config-layout';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useSession } from 'next-auth/react';
import NavToggleButton from '../NavToggleButton';
import { useNavData } from '../../config-navigation';
import { hideScroll } from '@/theme/css';

// import { useMockedUser } from 'src/hooks/use-mocked-user';

// import { hideScroll } from 'src/theme/css';

// import Logo from 'src/components/logo';
// import { NavSectionMini } from 'src/components/nav-section';

// import { NAV } from '../config-layout';
// import { useNavData } from './config-navigation';
// import NavToggleButton from '../common/nav-toggle-button';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { data } = useSession();

  const navData = useNavData();

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini
          data={navData}
          slotProps={{
            currentRole: String(data?.user.name),
          }}
        />
      </Stack>
    </Box>
  );
}
