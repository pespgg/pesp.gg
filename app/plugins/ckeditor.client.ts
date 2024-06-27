import {
  ClassicEditor,
  Alignment,
  AutoImage,
  Autoformat,
  AutoLink,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Essentials,
  FindAndReplace,
  FontColor,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SimpleUploadAdapter,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  WordCount
} from "ckeditor5";

import spanishTranslations from "ckeditor5/translations/es.js";
import CKEditor from "@ckeditor/ckeditor5-vue";
import type { App, Plugin } from "vue";

const isLayoutReady = ref(false);
const config = ref();
const editor = ref(ClassicEditor);

config.value = {
  language: { ui: "es", content: "es" },
  translations: [spanishTranslations],
  mediaEmbed: {
    previewsInData: true
  },
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "underline",
      "link",
      "fontSize",
      "fontColor",
      "highlight",
      "|",
      "alignment",
      "bulletedList",
      "numberedList",
      "todoList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageInsert",
      "mediaEmbed",
      "insertTable",
      "|",
      "heading",
      "|",
      "blockQuote",
      "horizontalLine",
      "|",
      "removeFormat",
      "findAndReplace",
      "|",
      "sourceEditing"
    ],
    shouldNotGroupWhenFull: false
  },
  plugins: [
    Alignment,
    AutoImage,
    Autoformat,
    AutoLink,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    Essentials,
    FindAndReplace,
    FontColor,
    FontSize,
    Heading,
    Highlight,
    HorizontalLine,
    Image,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SimpleUploadAdapter,
    SourceEditing,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo,
    WordCount
  ],
  balloonToolbar: ["bold", "italic", "|", "link", "insertImage"],
  blockToolbar: ["bold", "italic", "|", "link", "insertImage", "insertTable", "|", "indent", "outdent"],
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
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: "https://",
    decorators: {
      toggleDownloadable: {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "file"
        }
      }
    }
  },
  placeholder: "Escribe tu contenido aquí...",
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"]
  },
  simpleUpload: {
    uploadUrl: "/api/upload"
  }
};

isLayoutReady.value = true;

const component = CKEditor.component;
type CKEditorComponent = typeof component;
type CKEditorPlugin = CKEditorComponent & Plugin;

declare module "vue" {
  export interface GlobalComponents {
    CKEditor: CKEditorComponent;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const ckeditor: CKEditorPlugin = ((): CKEditorPlugin => {
    const installable = component as CKEditorPlugin;

    installable.install = (app: App) => {
      app.component("CKEditor", installable);
    };

    return installable;
  })();

  nuxtApp.vueApp.use(ckeditor);

  return {
    provide: { ckeditor: { editor: editor.value, config: config.value } }
  };
});
