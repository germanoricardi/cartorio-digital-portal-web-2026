import { TFunction } from '@/lib/i18n/types';
import { z } from 'zod';

export const loginSchema = (t: TFunction) => z.object({
  email: z.email(t('zodValidation.email')),
  password: z.string().min(6, t('zodValidation.password', { min: 6 })),
});

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;