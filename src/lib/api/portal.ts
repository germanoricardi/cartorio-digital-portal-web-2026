// lib/api-portal.ts
import axios from 'axios';
import { cookies } from 'next/headers';

export async function createPortalApi() {
  const token = (await cookies()).get('access_token')?.value;

  return axios.create({
    baseURL: process.env.PORTAL_API_URL,
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}