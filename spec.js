// Bot API action constants
module.exports = Object.freeze({
  identifier: "quote",
  actions: ["add", "get", "getById", "random", "power_on", "owner"],
  schema: {
    add: {
      arg_count: 2,
      args: [
        {
          name: "quote",
          type: "string",
          min: 5,
          max: 300
        }
      ]
    },
    get: {
      arg_count: 0,
      args: []
    },
    random: {
      arg_count: 0,
      args: []
    },
    getById: {
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

