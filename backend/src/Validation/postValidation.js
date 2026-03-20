const { z } = require("zod");

const postSchema = z.object({
  content: z.string().min(1)
});

module.exports = { postSchema };