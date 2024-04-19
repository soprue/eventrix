/**
 * 이미지를 webp로 변환하고 크기를 조정합니다.
 * @param {Blob} imageBlob 원본 이미지의 Blob 데이터.
 * @param {number} maxSize 최대 이미지 크기 (px).
 * @param {number} quality 이미지 품질 (0 ~ 1 사이의 값).
 * @returns {Promise<Blob>} webp 형식으로 변환된 이미지의 Blob.
 */
async function resizeAndConvertImage(
  imageBlob: Blob,
  maxSize = 1200,
  quality = 0.75,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      const maxSide = Math.max(width, height);
      // 이미지의 최대 크기 조정
      if (maxSide > maxSize) {
        const scaleFactor = maxSize / maxSide;
        width *= scaleFactor;
        height *= scaleFactor;
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        console.error('Canvas에서 2D 컨텍스트를 가져오는 데 실패했습니다.');
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas to Blob 변환 실패'));
          }
        },
        'image/webp',
        quality,
      );
    };

    img.onerror = () => {
      throw new Error('이미지를 로드하는 데 실패했습니다.');
    };

    img.src = URL.createObjectURL(imageBlob);
  });
}

export default resizeAndConvertImage;
