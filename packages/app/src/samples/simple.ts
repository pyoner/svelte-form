import TextareaField from "@pyoner/svelte-form/src/components/fields/extra/TextareaField.svelte";

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
        props: {
          autofocus: true
        }
      }
    },
    lastName: {
      type: "string",
      title: "Last name"
    },
    age: {
      type: "integer",
      title: "Age"
    },
    bio: {
      type: "string",
      title: "Bio",
      $svelte: {
        component: TextareaField
      }
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 3,
      $svelte: {
        props: {
          type: "password"
        }
      }
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10
    }
  }
};

export const value = {
  lastName: "Norris",
  age: 75,
  bio: "Roundhouse kicking asses since 1940",
  password: "noneed"
};
