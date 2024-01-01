import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import axios from "axios";
import { FormEvent } from "react";
import Lottie from 'lottie-react';
import animationData from '../../public/CreateAccount.json';

export default function RegisterPage() {
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
  });

  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = form.values.username;
    const email = form.values.email;
    const password = form.values.password;

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        username,
        email,
        password,
      });

      // レスポンスに基づいて処理を行う
      if (response.status === 200) {
        // 登録成功時の処理
        // ユーザーを自動的にログインさせる
        const loginResponse = await axios.post(
          "http://localhost:8000/api/login",
          {
            email: response.data.email,
            password: response.data.password,
          }
        );

        if (loginResponse.status === 200) {
          console.log(loginResponse.data);
          // ログイン成功時の処理
          window.location.href = "http://localhost:3555/";
        } else {
          // ログイン失敗時の処理
          router.push("/login");
        }
      } else {
        // 登録失敗時の処理
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
        <h1 className="font-bold text-3xl mb-2" style={{ fontFamily: 'DotGothic16' }}>アカウント作成</h1>
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
                placeholder="Username"
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
                placeholder="Email"
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
        <Lottie animationData={animationData} className="w-full h-auto md:h-600 md:w-600" />
      </div>
    </div>
  );
}
