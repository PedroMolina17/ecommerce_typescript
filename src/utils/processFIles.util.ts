export const processFiles = (files:any) => {
  if (!files) return {};
  const processedFiles:any = {};
  for (const key in files) {
    const paths = files[key].map((file:any) => file.path);
    processedFiles[key] = paths;
  }
  return processedFiles;
};
