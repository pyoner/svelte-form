import { extra } from "@pyoner/svelte-form";

export const schema = {
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
      default: "Chuck",
      $svelte: {
        field: {
          props: {
            autofocus: true,
          },
        },
      },
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    age: {
      type: "integer",
      title: "Age",
    },
    bio: {
      type: "string",
      title: "Bio",
      $svelte: {
        field: {
          component: extra.TextareaField,
        },
      },
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3,
      $svelte: {
        field: {
          props: {
            type: "password",
          },
        },
      },
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
    random: {
      type: "number",
      title: "Random number",
    },
  },
};

export const value = {
  lastName: "Norris",
  age: 75,
  bio: "Roundhouse kicking asses since 1940",
  password: "noneed",
};
