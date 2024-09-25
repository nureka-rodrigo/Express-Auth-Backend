import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export function validateData(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            status: false,
            error: "Invalid data",
            details: errorMessages,
          });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ status: false, error: "Internal Server Error" });
      }
    }
  };
}
