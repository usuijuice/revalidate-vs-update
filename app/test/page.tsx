import { unstable_cache } from "next/cache";
import {
  revalidateDataTagAction,
  revalidateTestPath,
  updateDataTagAction,
} from "./actions";

// Cached function with tag
const getDataWithTag = unstable_cache(
  async () => {
    return {
      message: "Cached data with tag",
      timestamp: new Date().toISOString(),
      random: Math.random(),
    };
  },
  ["data-with-tag"],
  { tags: ["data-tag"], revalidate: 3600 },
);

// Cached function without tag
const getDataWithoutTag = unstable_cache(
  async () => {
    return {
      message: "Cached data without tag",
      timestamp: new Date().toISOString(),
      random: Math.random(),
    };
  },
  ["data-without-tag"],
  { revalidate: 3600 },
);

export default async function TestPage() {
  const dataWithTag = await getDataWithTag();
  const dataWithoutTag = await getDataWithoutTag();
  const serverTimestamp = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Next.js revalidateTag vs updateTag テスト
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            サーバーレンダリング時刻
          </h2>
          <p className="text-gray-600 font-mono">{serverTimestamp}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              データ (タグ付き: "data-tag")
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">メッセージ:</span>{" "}
                {dataWithTag.message}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">タイムスタンプ:</span>{" "}
                <span className="font-mono">{dataWithTag.timestamp}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">ランダム値:</span>{" "}
                <span className="font-mono">{dataWithTag.random}</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              データ (タグなし)
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">メッセージ:</span>{" "}
                {dataWithoutTag.message}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">タイムスタンプ:</span>{" "}
                <span className="font-mono">{dataWithoutTag.timestamp}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">ランダム値:</span>{" "}
                <span className="font-mono">{dataWithoutTag.random}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            再検証アクション
          </h2>
          <div className="space-y-4">
            <form action={updateDataTagAction}>
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                updateTag("data-tag") を実行
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Server
                Actionから呼び出される新しいAPI。"data-tag"タグが付いたキャッシュのみが即座に再検証されます
              </p>
            </form>

            <form action={revalidateDataTagAction}>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                revalidateTag("data-tag", "max") を実行
              </button>
              <p className="text-sm text-gray-600 mt-2">
                従来のAPI（第2引数が必要）。"data-tag"
                タグが付いたキャッシュのみが再検証されます
              </p>
            </form>

            <form action={revalidateTestPath}>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                revalidatePath("/test") を実行
              </button>
              <p className="text-sm text-gray-600 mt-2">
                このページ全体が再検証されます（両方のデータが更新されます）
              </p>
            </form>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">
            使い方と期待される動作
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              1.
              最初にページを読み込むと、両方のデータが同じタイムスタンプとランダム値を持ちます
            </li>
            <li>
              2. "updateTag"
              ボタンをクリックすると、タグ付きデータ（左側）のみが即座に更新されます（Next.js
              16の新しいAPI）
            </li>
            <li>
              3. "revalidateTag"
              ボタンをクリックすると、タグ付きデータ（左側）のみが更新されます（従来のAPI）
            </li>
            <li>
              4. "revalidatePath"
              ボタンをクリックすると、ページ全体が再検証され、両方のデータが更新されます
            </li>
            <li>
              5.
              ブラウザを更新して、キャッシュされたデータが表示されることを確認できます
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
