import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;
  // Definir rutas públicas (no requieren token)
  const publicRoutes = ["/auth", "/forgotpassword"];
  // Definir rutas privadas (requieren token)
  const privateRoutes = ["/home", "/user/create/account"];
  
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // Verificar si la ruta actual es privada
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // Si es ruta privada y NO hay token -> redirigir a /auth
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  // Si es ruta pública y SÍ hay token -> redirigir a /home
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  // Permitir continuar
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/auth',
    '/forgotpassword',
    '/home',
    '/user/:path*', // Captura /user/create/account y cualquier subruta de /user
  ]
}
