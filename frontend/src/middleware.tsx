// ano_sono/frontend/ano_sono/src/middleware.tsx
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// frontend/src/middleware.tsx
export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl;

  // ユーザーが認証されていない場合でも、/login と /register ページにはアクセスできるようにする
  if (
    !req.nextauth.token &&
    pathname !== "/login" &&
    pathname !== "/register"
  ) {
    return NextResponse.redirect("/login");
  }

  // ユーザーが認証されている場合は /HomePage にリダイレクト
  if (
    req.nextauth.token &&
    (pathname === "/login" || pathname === "/register")
  ) {
    return NextResponse.redirect("/HomePage");
  }
});

export const config = {
  // ログインページ（/login）と登録ページ（/register）以外を対象にする
  matcher: "/((?!login|register).*)",
};
