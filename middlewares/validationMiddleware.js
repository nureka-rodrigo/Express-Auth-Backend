import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export function validateData(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => {
          // Check for a "required" message or other schema violation
          const isRequiredError = issue.message.toLowerCase().includes("required");
          return {
            message: isRequiredError
              ? `${issue.path.join('.')} is required`
              : `${issue.message}`,
          };
        });

        res.status(StatusCodes.BAD_REQUEST).json({
          status: false,
          error: "Invalid data",
          details: errorMessages,
        });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          error: "Internal Server Error",
        });
      }
    }
  };
}
