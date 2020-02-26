export const schema = {
  type: "array",
  title: "Profiles",
  description: "Specify any number of social networks that you participate in",
  additionalItems: false,
  items: {
    type: "object",
    title: "Profile",
    additionalProperties: true,
    properties: {
      network: {
        type: "string",
        title: "Network",
        description: "e.g. Facebook or Twitter"
      },
      username: {
        type: "string",
        title: "Username",
        description: "e.g. neutralthoughts"
      },
      url: {
        type: "string",
        title: "URL",
        description: "e.g. http://twitter.example.com/neutralthoughts"
      }
    }
  }
};

export const value = [];
