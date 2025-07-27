export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const formData = await readFormData(event);
  const file = formData.get("upload") as File | undefined;

  if (!file) throw createError({ statusCode: 400, message: t("bad_request") });

  checkFileSize(event);
  checkFileType(file.type);

  const dateTime = new Date().getTime();

  try {
    await hubBlob().put(file.name, file, {
      prefix: "uploads",
      httpMetadata: {
        contentType: file.type
      }
    });
    return { url: `${SITE.cdn}/uploads/${file.name}?updated=${dateTime}` };
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      message: (error as Error).message
    });
  }
});
