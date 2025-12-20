// @ts-expect-error no types from html-to-text
import { convert } from "html-to-text";
import type { AllowedComponentProps, VNodeProps } from "vue";
import type contacto from "~~/emails/contacto.vue";
import type unirse from "~~/emails/unirse.vue";

interface EmailTemplates {
  contacto: typeof contacto;
  unirse: typeof unirse;
}

type ExtractComponentProps<TComponent>
  = TComponent extends new () => {
    $props: infer P;
  }
    ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
    : never;

export const renderEmail = async <T extends keyof EmailTemplates>(
  templateName: T,
  props?: ExtractComponentProps<EmailTemplates[T]>
) => {
  const html: string = await renderEmailComponent(templateName, props);

  const text: string = convert(html, {
    selectors: [
      { selector: "img", format: "skip" }
    ]
  });

  return { html, text };
};
