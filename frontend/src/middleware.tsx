// ano_sono/frontend/ano_sono/src/middleware.tsx
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl;

  // ユーザーが認証されていない場合はログインページにリダイレクト
  if (!req.nextauth.token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }

  // ユーザーが認証されている場合はトップページにリダイレクト
  if (req.nextauth.token && pathname === "/login") {
    return NextResponse.redirect("/");
  }
});

export const config = {
  // ログインページ（/login）以外を対象にする
  matcher: "/((?!login).*)",
};
