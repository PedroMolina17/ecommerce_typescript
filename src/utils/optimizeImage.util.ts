import sharp from "sharp";
export const optimizeImage = async (
  fileToPath: string,
  fileName: string,
  outputFomat: "jpeg" | "png" | "webp",
  resize: { width: number; height?: number },
) => {
  try {
    const imageFileToPath = `public/images/temp/${fileName.split(".")[0]}.${outputFomat}`;

    const imageResized = await sharp(fileToPath)
      .resize(resize)
      .toFormat(outputFomat)
      .toFile(imageFileToPath);
    return { ...imageResized, imageFileToPath };
  } catch (err) {
    console.log("---->error al optimizar image", err);
  }
};
