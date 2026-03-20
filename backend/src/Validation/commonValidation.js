const { z } = require("zod");

const idParamSchema = z.object({
  id: z.coerce.number()
});

module.exports = { idParamSchema };