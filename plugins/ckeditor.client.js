import "~/assets/ckeditor/build/ckeditor";

const config = {
  simpleUpload: {
    uploadUrl: "/api/upload"
  }
};

export default defineNuxtPlugin(() => {
  return {
    provide: { ckeditor: { editor: ClassicEditor, config } }
  };
});
