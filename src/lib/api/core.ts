// lib/api-core.ts
import axios from 'axios';
import { cookies } from 'next/headers';

export async function createCoreApi() {
  const token = (await cookies()).get('access_token')?.value;

  return axios.create({
    baseURL: process.env.CORE_API_URL,
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}