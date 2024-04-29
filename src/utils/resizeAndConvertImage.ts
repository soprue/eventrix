import Pica from 'pica'; // `Pica`로 불러와 클래스처럼 사용

/**
 * 이미지를 webp로 변환하고 크기를 조정합니다.
 * @param {Blob} imageBlob 원본 이미지의 Blob 데이터.
 * @param {number} maxSize 최대 이미지 크기 (px).
 * @param {number} quality 이미지 품질 (0 ~ 1 사이의 값).
 * @returns {Promise<Blob>} webp 형식으로 변환된 이미지의 Blob.
 */
export default async function resizeAndConvertImage(
  imageBlob: Blob,
  maxSize = 1200,
  quality = 0.75,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const pica = Pica();
    const img = new Image();
    const canvas = document.createElement('canvas');
    const resultCanvas = document.createElement('canvas');
    const objectURL = URL.createObjectURL(imageBlob);

    img.onload = async () => {
      URL.revokeObjectURL(objectURL);

      let width = img.width;
      let height = img.height;

      const maxSide = Math.max(width, height);
      if (maxSide > maxSize) {
        const scaleFactor = maxSize / maxSide;
        width *= scaleFactor;
        height *= scaleFactor;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx!.drawImage(img, 0, 0, width, height);

      resultCanvas.width = width;
      resultCanvas.height = height;

      try {
        await pica.resize(canvas, resultCanvas);
        const blob = await pica.toBlob(resultCanvas, 'image/webp', quality);
        resolve(blob);
      } catch (error) {
        reject(new Error('Image resizing and conversion failed: ' + error));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      throw new Error('이미지를 로드하는 데 실패했습니다.');
    };

    img.src = objectURL;
  });
}
