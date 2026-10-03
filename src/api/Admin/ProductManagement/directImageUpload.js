/** Upload bytes to S3 without backend authentication headers or cookies. */
export async function uploadImagesDirectly({ files, requestUploadUrl, registerImageKeys, fetchFile = fetch }) {
  if (!files?.length || files.length > 10) {
    throw new Error("画像は1〜10枚選択してください。");
  }
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
  if (files.some((file) => !file || file.size <= 0 || !allowedTypes.has(file.type))) {
    throw new Error("JPG・PNG・WEBP・GIFの画像ファイルを選択してください。");
  }

  const imageKeys = [];
  for (const file of files) {
    const { uploadUrl, imageKey } = await requestUploadUrl(file.type);
    if (!uploadUrl || !imageKey) {
      throw new Error("画像アップロードURLを取得できませんでした。");
    }
    const response = await fetchFile(uploadUrl, {
      method: "PUT",
      credentials: "omit",
      headers: { "Content-Type": file.type },
      body: file,
      signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) {
      throw new Error("画像のアップロードに失敗しました。もう一度お試しください。");
    }
    imageKeys.push(imageKey);
  }
  // Register only after every file has uploaded successfully.
  return registerImageKeys(imageKeys);
}
