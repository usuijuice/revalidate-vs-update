import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="max-w-2xl w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Next.js Cache Revalidation Test
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Next.jsのupdateTag、revalidateTag、revalidatePathの挙動をテストするためのアプリケーションです。
          </p>

          <div className="space-y-4">
            <Link
              href="/test"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-center"
            >
              テストページへ移動
            </Link>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h2 className="text-lg font-semibold mb-3 text-blue-900">
                機能説明
              </h2>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ updateTag() の動作確認（Next.js 16の新API）</li>
                <li>✓ revalidateTag() の動作確認</li>
                <li>✓ revalidatePath() の動作確認</li>
                <li>✓ キャッシュタグ付きデータとタグなしデータの比較</li>
                <li>✓ リアルタイムでのキャッシュ更新の可視化</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
