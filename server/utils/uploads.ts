import type { H3Event } from "h3";

export const checkFileSize = (event: H3Event) => {
  const headers = getHeaders(event);
  const MBsize = Number(headers["content-length"]) / 1024 / 1024;
  if (MBsize > 8) {
    throw createError({
      statusCode: 413,
      message: t("file_too_large")
    });
  }
};

const validTypes = ["image/jpeg", "image/x-png", "image/png", "image/svg+xml", "image/gif", "image/webp"];
export const checkFileType = (type: string = "") => {
  if (!validTypes.includes(type)) {
    throw createError({
      statusCode: 415,
      message: t("unsupported_media")
    });
  }
};
