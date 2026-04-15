import { NextRequest, NextResponse } from 'next/server';
import { authEndpoints } from '@/modules/auth/auth.endpoints';
import { createCoreApi } from '@/lib/api/core';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const api = await createCoreApi();

    const response = await api.post(authEndpoints.login, body);

    const { accessToken, refreshToken, user } = response.data;

    // 🔐 Salva tokens em cookies seguros
    const res = NextResponse.json({ user });

    // Access Token (curta duração)
    res.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15, // 15 minutos
    });

    // Refresh Token (longa duração)
    res.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return res;
  } catch (error: any) {
    console.error('Login error:', error);

    return NextResponse.json(
      {
        message:
          error?.response?.data?.message || 'Erro ao realizar login',
      },
      {
        status: error?.response?.status || 500,
      }
    );
  }
}