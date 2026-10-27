/**
 * Online Image Uploader & Storage Utility
 * Allows images to be stored online on the web so they persist across all devices,
 * mobile phones, and online visitors.
 */

import { compressImageFile } from './storage';

// Free public image upload providers with fallback
export const uploadImageToWeb = async (file: File): Promise<{ url: string; isOnline: boolean }> => {
  // First, compress the image to a lightweight format to ensure quick uploads
  const compressedDataUrl = await compressImageFile(file, 1200, 0.85);

  // Attempt 1: Upload to FreeImage.host public API
  try {
    const formData = new FormData();
    formData.append('key', '6d207e02198a847e52c0a972401470bd');
    formData.append('action', 'upload');
    formData.append('source', compressedDataUrl.replace(/^data:image\/\w+;base64,/, ''));
    formData.append('format', 'json');

    const response = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.image?.url) {
        return { url: data.image.url, isOnline: true };
      }
    }
  } catch (err) {
    console.warn('Freeimage upload attempt 1 failed, trying fallback...', err);
  }

  // Attempt 2: Upload to tmpfiles.org
  try {
    const blob = await (await fetch(compressedDataUrl)).blob();
    const formData = new FormData();
    formData.append('input_file', blob, file.name || 'image.jpg');

    const res = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.url) {
        // tmpfiles returns e.g. https://tmpfiles.org/12345/image.jpg
        // Direct link is https://tmpfiles.org/dl/12345/image.jpg
        const directUrl = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
        return { url: directUrl, isOnline: true };
      }
    }
  } catch (err) {
    console.warn('Fallback upload failed, using high-quality compressed image...', err);
  }

  // Graceful fallback: high-quality compressed dataUrl that stays in local state
  return { url: compressedDataUrl, isOnline: false };
};

/**
 * Validates if a string is a valid web URL (http:// or https://)
 */
export const isValidWebUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};
