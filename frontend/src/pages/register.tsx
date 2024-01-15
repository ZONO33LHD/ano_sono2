import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { FormEvent } from "react";
import Lottie from "lottie-react";
import animationData from "../../public/CreateAccount.json";

export default function RegisterPage() {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://aonosono2024.net/api';
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://aonosono2024.net';
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: (values) => {
      const errors: { email?: string; password?: string } = {};

      if (!isEmail(values.email)) {
        errors.email = "有効なメールアドレスを入力してください";
      }

      const hasUpperCase = /[A-Z]/.test(values.password);
      const hasLowerCase = /[a-z]/.test(values.password);
      const hasNumber = /\d/.test(values.password);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(values.password);

      if (!hasUpperCase) {
        errors.password = "パスワードには少なくとも1つの大文字英字が必要です";
      } else if (!hasLowerCase) {
        errors.password = "パスワードには少なくとも1つの小文字英字が必要です";
      } else if (!hasNumber) {
        errors.password = "パスワードには少なくとも1つの数字が必要です";
      } else if (!hasSymbol) {
        errors.password = "パスワードには少なくとも1つの記号が必要です";
      } else if (values.password.length < 8) {
        errors.password = "パスワードは8文字以上である必要があります";
      }

      return errors;
    },
  });

  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.keys(form.errors).length > 0) {
      return;
    }

    const { username, email, password } = form.values;

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      if (response.data.resultFlag === 1) {
        window.location.href = FRONTEND_URL;
      } else {
        router.push("/register");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 container mx-auto my-10 px-4 md:px-12">
        <h1
          className="font-bold text-3xl mb-2"
          style={{ fontFamily: "DotGothic16" }}
        >
          アカウント作成
        </h1>
        <div className="flex justify-end mr-5 text-gray-600 text-sm text-center mt-1">
          <button onClick={handleLoginClick} className="text-blue-500 text-sm">
            ログイン画面へ
          </button>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="username"
                type="text"
                placeholder="ユーザー名入力"
                required
                {...form.getInputProps("username")}
              />
            </div>
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
                type="email"
                placeholder="Email入力"
                required
                {...form.getInputProps("email")}
              />
              {form.errors.email && (
                <div className="text-red-500">{form.errors.email}</div>
              )}
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
                placeholder="パスワード入力"
                required
                {...form.getInputProps("password")}
              />
              {form.errors.password && (
                <div className="text-red-500">{form.errors.password}</div>
              )}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              作成
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2 md:ml-10 mt-10 md:mt-0 flex justify-center">
        {/* ここに画像または他のコンテンツを配置 */}
        <Lottie
          animationData={animationData}
          className="w-full h-auto md:h-600 md:w-600"
        />
      </div>
    </div>
  );
}
