"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/legacy/image";
import top_image from "../../public/top_image.jpg";

interface PostProps {
  id: number;
  title: string;
  description: string;
  url: string;
}

const Page: React.FC = () => {
  const [posts, setPosts] = React.useState<PostProps[]>([]);
  const [showModal, setShowModal] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(event.target.value);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const [editingTitle, setEditingTitle] = useState("");
  const [editingUrl, setEditingUrl] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const handleEditingTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditingTitle(event.target.value);
  };

  const handleEditingUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditingUrl(event.target.value);
  };

  const handleEditingDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditingDescription(event.target.value);
  };

  const handleOpenEditModal = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setEditingTitle(postToEdit.title);
      setEditingUrl(postToEdit.url);
      setEditingDescription(postToEdit.description);
      setEditingPostId(id);
    }
    setEditModalOpen(true);
  };
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.put(`http://localhost:8000/api/blog/edit/${editingPostId}`, {
        id: editingPostId,
        title: editingTitle,
        url: editingUrl,
        description: editingDescription,
      });
      if (response.data.startsWith("URLが正しくありません")) {
        setErrorMessage(response.data);
      } else {
        setEditModalOpen(false);
        setPosts(
          posts.map((post) =>
            post.id === editingPostId
              ? {
                  ...post,
                  title: editingTitle,
                  url: editingUrl,
                  description: editingDescription,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEditModal = () => {
    // 編集モーダルを閉じ、編集中の投稿IDをリセットする
    setEditModalOpen(false);
    setEditingPostId(null);
    setErrorMessage(''); 
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blog/count")
      .then((response) => {
        setTotalPages(Math.ceil(response.data / 5));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:8000/api/blog", {
        title: title,
        url: url,
        description: description,
      });
      if (response.data.startsWith("URLが正しくありません")) {
        setErrorMessage(response.data);
      } else {
        setShowModal(false);
        setTitle("");
        setDescription("");
        setUrl("");
        setPosts((prevPosts) => [
          ...prevPosts,
          {
            id: response.data.id,
            title: title,
            url: url,
            description: description,
          },
        ]);
        // 投稿の総数を再取得
        const countResponse = await axios.get("http://localhost:8000/api/blog/count");
        setTotalPages(Math.ceil(countResponse.data / 5));
        setCurrentPage(Math.ceil(countResponse.data / 5)); // 追加: currentPageを最新のページに更新
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/blog/delete/${id}`)
      .then((response) => {
        setPosts(posts.filter((post) => post.id !== id));
        axios
          .get("http://localhost:8000/api/blog/count")
          .then((response) => {
            const newTotalPages = Math.ceil(response.data / 5);
            setTotalPages(newTotalPages);
            if (currentPage > newTotalPages) {
              setCurrentPage(newTotalPages);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/blog/get?startIndex=${(currentPage - 1) * 5}`
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage]);

  // コンポーネント内部
useEffect(() => {
  // コンポーネントがマウントされたときに背景色を黒に設定(bg-gray-200)
  document.body.style.backgroundColor = '#E5E7EB';

  // コンポーネントがアンマウントされたときに背景色をリセット
  return () => {
    document.body.style.backgroundColor = '';
  };
}, []);


  return (
    <>
      <main className="bg-gray-200">
        <div>
          <Image
            src={top_image}
            alt="ano_sono"
            layout="responsive"
            objectFit="cover"
            width={1920}
            height={400}
          />
        </div>
        <div className="fixed mt-3  w-full flex justify-end bg-gray-200 z-10">
          <button
            onClick={handleOpenModal}
            className="relative bg-green-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-10"
          >
            新規登録
          </button>
        </div>
        <div className="mt-20">
          {posts.map((post) => (
            <div
              key={post.id}
              className="card m-10 bg-white shadow-lg rounded-lg overflow-hidden my-4 block relative hover:shadow-xl transition-shadow duration-200 h-128 overflow-auto"
            >
              <div>
                <a href={post.url} target="_blank" className="card-body p-4">
                  <h5 className="card-title pl-3 text-xl font-bold underline truncate">
                    {post.title.length > 30
                      ? `${post.title.substring(0, 60)}...`
                      : post.title}
                  </h5>
                  <p className="card-text pl-3 text-gray-700 mt-2 min-h-[size]">
                    {post.description || "　"}
                  </p>
                </a>
                <button
                  onClick={() => handleOpenEditModal(post.id)}
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-16"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-16 w-full flex justify-center bg-gray-200 z-10">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`mx-2 px-4 py-2 bg-gray-200 text-black rounded ${
              currentPage !== 1 ? "hover:bg-gray-300" : ""
            }`}
          >
            &lt;
          </button>
          <div className="flex items-center bg">
            <p className="mx-2">{`${currentPage} / ${totalPages}`}</p>
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            className={`mx-2 px-4 py-2 bg-gray-200 text-black rounded ${
              currentPage < totalPages ? "hover:bg-gray-300" : ""
            }`}
          >
            &gt;
          </button>
        </div>
        {/* 新規登録モーダル */}
        {showModal && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    気になる保管したいサイトを登録しよう！
                  </h2>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="タイトル"
                    />
                    <input
                      type="text"
                      value={url}
                      onChange={handleChange}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="URL"
                    />
                    <input
                      type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="一言あればサイトの説明をどうぞ"
                    />
                    <div className="flex justify-end mt-3">
                      {" "}
                      {}
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        登録
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        閉じる
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 編集モーダル */}
        {editModalOpen && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    投稿を編集
                  </h2>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={handleEditingTitleChange}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="タイトル"
                    />
                    <input
                      type="text"
                      value={editingUrl}
                      onChange={handleEditingUrlChange}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="URL"
                    />
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={handleEditingDescriptionChange}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="一言あればサイトの説明をどうぞ"
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        更新
                      </button>
                      <button
                        onClick={handleCloseEditModal}
                        className="ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        キャンセル
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col justify-center items-center"></div>
      </main>
    </>
  );
};

export default Page;
