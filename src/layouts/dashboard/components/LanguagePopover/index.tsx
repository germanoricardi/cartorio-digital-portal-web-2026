'use client';

import { m } from 'framer-motion';
import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import CustomPopover, { usePopover } from '@/components/CustomPopover';
import { varHover } from '@/components/Animate';
import Iconify from '@/components/Iconify';

import { useLocale } from 'next-intl';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'pt-BR',
    label: 'Português',
    icon: 'flagpack:br',
  },
  {
    value: 'en-US',
    label: 'English',
    icon: 'flagpack:us',
  },
];

export default function LanguagePopover() {
  const popover = usePopover();

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const currentLang = LANGS.find((l) => l.value === currentLocale);

  const handleChangeLang = useCallback(
    (newLocale: string) => {
      if (newLocale === currentLocale) return;

      // substitui o locale na URL
      const segments = pathname.split('/');
      segments[1] = newLocale;

      router.push(segments.join('/'));

      popover.onClose();
    },
    [currentLocale, pathname, router, popover]
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          ...(popover.open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Iconify icon={String(currentLang?.icon)} sx={{ borderRadius: 0.65, width: 28 }} />
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 160 }}>
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLocale}
            onClick={() => handleChangeLang(option.value)}
          >
            <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}