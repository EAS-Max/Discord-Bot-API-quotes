// Bot API action constants
module.exports = Object.freeze({
  identifier: "quote",
  actions: ["add", "person", "ID", "random", "power_on", "owner"],
  schema: {
    add: {
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
    power_on: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },
    owner: {
      arg_count: 0,
      args: []
    }
  }
});

