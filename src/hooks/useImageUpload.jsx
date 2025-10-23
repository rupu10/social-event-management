import { useState } from "react";

export default function useImageUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const uploadImage = async (imageFile) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Image upload failed");
      }
      return data.data.url;

    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
}
