// frontend/src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// これは仮の関数で、実際のデータベースからユーザー情報を取得するロジックに置き換えてください。
async function getUserFromDatabase(email: string, password: string) {
  // データベースからユーザー情報を取得するロジックをここに書く
  // ここでは仮のユーザーオブジェクトを返します。
  return { id: "1", name: "username", email: email };
}

export default NextAuth({
  providers: [
    // emailとパスワードでのサインイン
    CredentialsProvider({
      credentials: {
        email: {
          label: "メールアドレス",
          type: "text",
          placeholder: "メールアドレス",
        },
        password: { label: "パスワード", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const user = await getUserFromDatabase(
          credentials.email,
          credentials.password
        );
        if (user) {
          return { id: user.id, name: user.name, email: user.email };
        } else {
          // ユーザーがデータベースに存在しない場合の処理をここに書く
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // カスタムログインページのパスを指定します
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      // ログイン後に /HomePage にリダイレクト
      return Promise.resolve("/");
    },
    async session({ session, token }) {
      if (token.idToken) {
        session.user.idToken = token.idToken;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Credentialsサインインの場合: userに情報が付与されている
      if (account && user) {
        token.idToken = account.id_token || user.idToken;
        token.accessToken = account.access_token || user.accessToken;
        token.accessTokenExpires =
          account.expires_at || user.accessTokenExpires;
        token.refreshToken = account.refresh_token || user.refreshToken;
        return token;
      }
      // JWTの場合: userに情報が付与されていない
      if (token && token.accessToken) {
        return token;
      }

      // すべての条件が一致しない場合、デフォルトのJWTオブジェクトを返す
      return {
        ...token,
        idToken: "",
        accessToken: "",
        accessTokenExpires: 0,
        refreshToken: "",
      };
    },
  },
});
