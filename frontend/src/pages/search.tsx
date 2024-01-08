import React, { useState } from "react";
import Footer from "../app/components/Footer";
import axios from "axios";
import { NavBar } from "@/app/components/NavBar";


type SearchResult = {
  id: number;
  title: string;
  url: string;
  description: string;
};

export default function Search() {
  const API_URL = process.env.API_URL || 'http://localhost:8000';
  const [searchTerm, setSearchTerm] = useState("");
  const [descriptionTerm, setDescriptionTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const limit = 9;
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const [editUrl, setEditUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 完全一致と部分一致の状態を管理するためのuseStateフックを追加
  const [isExactMatch, setIsExactMatch] = useState(false);
  const [isPartialMatch, setIsPartialMatch] = useState(false);

  // チェックボックスが変更されたときに状態を更新するイベントハンドラ
  const handleExactMatchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsExactMatch(event.target.checked);
    if (event.target.checked) {
      setIsPartialMatch(false);
    }
  };

  const handlePartialMatchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPartialMatch(event.target.checked);
    if (event.target.checked) {
      setIsExactMatch(false);
    }
  };

  // 検索関数内で、どちらのチェックボックスが選択されているかに基づいて検索ロジックを分岐
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    let searchType = "";
    if (isExactMatch) {
      searchType = "exact";
    } else if (isPartialMatch) {
      searchType = "partial";
    }

    const response = await axios.post(`${API_URL}/api/blog/search`, {
      title: searchTerm,
      description: descriptionTerm,
      startIndex: startIndex,
      limit: limit + 1, // 1つ余分に取得
      searchType: searchType,
    });

    // 取得した投稿を表示
    setSearchResults(response.data.slice(0, limit));
    // "もっと見る"ボタンの表示状態を更新
    setShowLoadMoreButton(response.data.length > limit);
  };

  const loadMoreResults = async () => {
    const response = await axios.post(`${API_URL}/api/blog/search`, {
      title: searchTerm,
      description: descriptionTerm,
      startIndex: searchResults.length,
      limit: limit,
    });
    setSearchResults(searchResults.concat(response.data));

    // 返された結果の数がlimitより少なければ、"もっと見る"ボタンを非表示にする
    if (response.data.length < limit) {
      setShowLoadMoreButton(false);
    }
  };

  const handleOpenEditModal = (
    id: number,
    title: string,
    url: string,
    description: string
  ) => {
    setEditId(id);
    setEditTitle(title);
    setEditUrl(url);
    setEditDescription(description);
    setShowModal(true);
  };

  const handleEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    if (editId === undefined) {
      console.error("editId is undefined");
      return;
    }
    try {
      const response = await axios.put(
        `${API_URL}/api/blog/edit/${editId}`,
        {
          id: editId ? editId.toString() : null,
          title: editTitle,
          url: editUrl,
          description: editDescription,
        }
      );
      if (response.data.startsWith("URLが正しくありません")) {
        setErrorMessage(response.data);
      } else {
        setShowModal(false);
        setSearchResults(
          searchResults.map((result) =>
            result.id === editId
              ? {
                  ...result,
                  title: editTitle,
                  url: editUrl,
                  description: editDescription,
                }
              : result
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${API_URL}/api/blog/delete/${id}`)
      .then((response) => {
        // 削除が成功したら、ローカルの状態から削除した投稿を除外
        setSearchResults((prevResults) =>
          prevResults.filter((result) => result.id !== id)
        );
        // 新たに2つの投稿を取得
        axios
          .post(`${API_URL}/api/blog/search`, {
            title: searchTerm,
            description: descriptionTerm,
            startIndex: searchResults.length - 1, // 削除後の投稿数をstartIndexとする
            limit: 2, // 2つ取得
          })
          .then((response) => {
            // 取得した投稿を追加
            setSearchResults((prevResults) => [
              ...prevResults,
              ...response.data.slice(0, 1),
            ]);
            // "もっと見る"ボタンの表示状態を更新
            setShowLoadMoreButton(response.data.length > 1);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function getGridColsClass(): string {
    return "grid-cols-3 justify-items-start items-start";
  }

  return (
    <>
      <div className="w-full">
        <div className="sticky top-0 z-50">
        <NavBar />
        </div>
        <div className="flex flex-col items-start mt-6 w-4/5 mx-auto">
          <h1 className="text-2x1 font-bold mb-4" style={{ fontFamily: 'Monomaniac One' }}>検索しよう！</h1>
          <form onSubmit={handleSearch} className="mb-4 w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              placeholder="タイトル"
            />
            <input
              type="text"
              value={descriptionTerm}
              onChange={(e) => setDescriptionTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              placeholder="一言"
            />
            <div className="flex space-x-4">
              <div>
                <input
                  type="checkbox"
                  id="exactMatch"
                  checked={isExactMatch}
                  onChange={handleExactMatchChange}
                />
                <label htmlFor="exactMatch">完全一致</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="partialMatch"
                  checked={isPartialMatch}
                  onChange={handlePartialMatchChange}
                />
                <label htmlFor="partialMatch">部分一致</label>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-5 py-2 rounded bg-blue-500 text-white cursor-pointer"
              >
                検索
              </button>
            </div>
          </form>
          <div
            className={`mt-10 grid gap-4 overflow-auto pb-10 mb-10 w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-template-columns: repeat(3, 1fr)`}
          >
            {searchResults.map((result, index) => (
              <div
                key={result.id}
                className="card m-0 mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-9 block relative hover:shadow-xl transition-shadow duration-200 w-full flex-grow h-full"
              >
                <div>
                  <a
                    href={result.url}
                    target="_blank"
                    className="card-body p-4"
                  >
                    <h5 className="card-title pl-3 text-xl font-bold underline truncate">
                      {result.title.length > 40
                        ? `${result.title.substring(0, 60)}...`
                        : result.title}
                    </h5>
                    <p className="card-text pl-3 text-gray-700 mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {result.description}
                    </p>
                  </a>
                  <div className="absolute bottom-0 right-0 flex">
                    <button
                      onClick={() =>
                        handleOpenEditModal(
                          result.id,
                          result.title,
                          result.url,
                          result.description
                        )
                      }
                      className="mr-2 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(result.id)}
                      className="mr-2 mb-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {searchResults.length === 1 && (
              <div className="card-placeholder flex-grow h-full"></div>
            )}
            {searchResults.length <= 2 && (
              <div className="card-placeholder flex-grow h-full"></div>
            )}
          </div>
          {showLoadMoreButton && (
            <div className="mt-6 w-full flex justify-center pb-20">
              <button
                onClick={loadMoreResults}
                className="px-5 py-2 rounded bg-gray-500 text-white cursor-pointer h-auto"
              >
                もっと見る
              </button>
            </div>
          )}
        </div>
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
                    投稿を編集
                  </h2>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  <form onSubmit={handleEdit}>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="タイトル"
                    />
                    <input
                      type="text"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="URL"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md"
                      placeholder="一言"
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        更新
                      </button>
                      <button
                        onClick={() => {
                          setShowModal(false);
                          setErrorMessage("");
                        }}
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
        <Footer />
      </div>
    </>
  );
}
