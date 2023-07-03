import express, { NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'yup';

export const bodySchemaValidationMiddleware = (schema: ObjectSchema<any>) => {
  return async (req: any , res: any , next: NextFunction) => {
    try {
      const userData = req.body;
      await schema.validate(userData, { abortEarly: false });
      next();
    } catch (error) {
      const validationErrors: { [key: string]: string } = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          validationErrors[err.path ?? 'unknown'] = err.message;
        });
      }
      res.status(400).json({ errors: validationErrors });
    }
  };
};