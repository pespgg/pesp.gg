const config = {
  image: {
    upload: {
      types: ["jpeg", "png", "webp", "gif", "svg+xml"]
    },
    toolbar: [
      "toggleImageCaption",
      "imageTextAlternative",
      "|",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:alignLeft",
      "imageStyle:side",
      "|",
      "resizeImage:original",
      "resizeImage:50",
      "resizeImage:75",
      "|",
      "linkImage"
    ]
  },
  simpleUpload: {
    uploadUrl: "/api/upload"
  }
};

export default defineNuxtPlugin(async () => {
  await import("~/assets/ckeditor/build/ckeditor");
  return {
    provide: { ckeditor: { editor: ClassicEditor, config } }
  };
});
