// src/types/auth.ts (or any common types file)

import type { Request } from 'express';

// Extend the built-in Request interface
export interface AuthenticatedRequest extends Request {
    userId?: string;
}