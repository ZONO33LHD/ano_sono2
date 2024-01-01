import { useRouter } from 'next/router';
import { useForm } from "@mantine/form";
import axios from "axios";

export const SignInPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "不正なメールアドレスです。",
      password: (value) =>
        value.length < 8
          ? "パスワードは8文字以上入力してください。"
          : !value.match(/[0-9]/)
          ? "数字を含めてください"
          : !value.match(/[a-z]/)
          ? "英語の小文字を含めてください"
          : !value.match(/[A-Z]/)
          ? "英語の大文字を含めてください"
          : !value.match(/[$&+,:;=?@#|'<>.^*()%!-]/)
          ? "記号を含めてください"
          : null,
    },
  });

  const router = useRouter(); 

  const onSubmit = async () => { // ここをasyncとマークします
    const username = form.values.email;
    const password = form.values.password;

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      });

      // レスポンスに基づいて処理を行う
      if (response.status === 200) {
        // ログイン成功時の処理
        router.push('/'); 
      } else {
        // ログイン失敗時の処理
        router.push('/login'); 
      }
    } catch (error) {
      console.error(error);
      router.push('/login');
    }
  };

  return (
    <div className="container mx-auto my-10 px-4 md:px-12">
      <h1 className="font-bold text-3xl mb-2">Welcome back!</h1>
      <p className="text-gray-600 text-sm text-center mt-1">
        Do not have an account yet?{" "}
        <button className="text-blue-500 text-sm">Create account</button>
      </p>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="email"
              type="text"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("email")}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              placeholder="Your password"
              required
              {...form.getInputProps("password")}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm">Remember me</span>
            </label>
            <button className="text-blue-500 text-sm">Forgot password?</button>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
