import type { FormComponents } from "../types";
import Wrapper from "./Wrapper.svelte";
import Layout from "./Layout.svelte";
import Form from "./Form.svelte";
import { defaultFieldComponents } from "./fields";

export const defaultFormComponents: FormComponents = {
  layout: Layout,
  wrapper: Wrapper,
  form: Form,
  fields: defaultFieldComponents,
};

export { Wrapper, Layout, Form };
