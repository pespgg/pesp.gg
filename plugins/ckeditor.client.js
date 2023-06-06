import "~/assets/ckeditor/build/ckeditor";

const config = {
  image: {
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

export default defineNuxtPlugin(() => {
  return {
    provide: { ckeditor: { editor: ClassicEditor, config } }
  };
});
