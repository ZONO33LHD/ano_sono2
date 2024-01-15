import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import axios from "axios";
import { signIn } from "next-auth/react";
import Lottie from 'lottie-react';
import animationData from '../../public/Loginpage.json';

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

export default function LoginPage() {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://aonosono2024.net/api';
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://aonosono2024.net';

  const form = useForm<FormValues>({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validateInputOnBlur: true,
  });

  const router = useRouter();

  // onSubmit 関数の values パラメータに型を指定します。
  const onSubmit = async (values: FormValues) => {
    const { usernameOrEmail, password } = values;

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: usernameOrEmail,
        password,
      });

      if (response.status === 200) {
        // ログイン成功時の処理
        await signIn("credentials", {
          email: usernameOrEmail,
          password,
          callbackUrl: FRONTEND_URL,
        });
      } else {
        // ログイン失敗時の処理
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAccountClick = () => {
    router.push("/register");
  };


  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="w-full md:w-1/2 container mx-auto my-10 px-4 md:px-12">
      <h1 className="font-bold text-3xl mb-2" style={{ fontFamily: 'Rampart One' }}>ano_sonoログイン</h1>
        <div className="flex justify-end mr-5 text-gray-600 text-sm text-center mt-1">
          <button
            onClick={handleCreateAccountClick}
            className="text-blue-500 text-sm"
          >
            アカウント作成へ
          </button>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
          <form onSubmit={form.onSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="usernameOrEmail"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="usernameOrEmail"
                type="text"
                placeholder="Email入力"
                required
                {...form.getInputProps("usernameOrEmail")}
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
                placeholder="パスワード入力"
                required
                {...form.getInputProps("password")}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="text-blue-500 text-sm">
                パスワードをお忘れの場合こちら
              </button>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2 md:ml-10 mt-10 md:mt-0 flex justify-center">
        {/* ここに画像または他のコンテンツを配置 */}
        <Lottie animationData={animationData} className="w-full h-auto md:h-600 md:w-600" />
      </div>
    </div>
  );
}