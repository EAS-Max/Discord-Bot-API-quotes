// Bot API action constants
module.exports = Object.freeze({
  identifier: "quote",
  actions: ["add", "person", "ID", "random", "delete", "owner", "actions", "stats"],
  schema: {
    add: {
      arg_count: 0,
      args: []
    },
    actions: {
      arg_count: 0,
      args: []
    },
    stats: {
      arg_count: 0,
      args: []
    },
    person: {
      arg_count: 1,
      args: [
        {
          name: "person",
          type: "string",
          min: 3,
          max: 30
        }
      ]
    },
    random: {
      arg_count: 0,
      args: []
    },
    ID: {
      arg_count: 1,
      args: [
        {
          name: "number",
          type: "string",
          min: 1,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },
    delete: {
      arg_count: 0,
      args: []
    },
    owner: {
      arg_count: 0,
      args: []
    }
  }
});

