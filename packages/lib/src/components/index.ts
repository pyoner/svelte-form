import type { FormComponents } from "../types";
import Wrapper from "./Wrapper.svelte";
import Layout from "./Layout.svelte";
import Form from "./Form.svelte";
import ItemWrapper from "./ItemWrapper.svelte";
import ItemCtrl from "./ItemCtrl.svelte";
import AddItem from "./AddItem.svelte";
import { defaultFieldComponents as fields } from "./fields";

export const defaultFormComponents: FormComponents = {
  layout: Layout,
  wrapper: Wrapper,
  form: Form,
  itemWrapper: ItemWrapper,
  itemCtrl: ItemCtrl,
  addItem: AddItem,
  fields: fields,
};

export { Wrapper, Layout, Form, ItemWrapper, ItemCtrl, AddItem, fields };
