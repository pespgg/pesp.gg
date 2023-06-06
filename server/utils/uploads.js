export const checkFileSize = (event) => {
  const headers = getHeaders(event);
  const MBsize = headers["content-length"] / 1024 / 1024;
  if (MBsize > 8) {
    throw createError({
      statusCode: 413,
      statusMessage: "File too large"
    });
  }
};

const validTypes = ["image/jpeg", "image/x-png", "image/png", "image/svg+xml", "image/gif", "image/webp"];
export const checkFileType = (type) => {
  if (!validTypes.includes(type)) {
    throw createError({
      statusCode: 415,
      statusMessage: "Unsupported Media Type"
    });
  }
};
