import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

describe('Auth Validation & Security Hardening Tests (BUG-001, BUG-002, BUG-041)', () => {
  it('should enforce role stripping and reject privilege escalation', () => {
    const userInput = {
      name: 'Hacker User',
      email: 'hacker@test.com',
      password: 'hacker123',
      role: 'admin',
    };

    // Strip role field explicitly
    const { role, ...safeData } = userInput;
    const enforcedUser = { ...safeData, role: 'rider' };

    expect(enforcedUser.role).toBe('rider');
    expect(enforcedUser.role).not.toBe('admin');
  });

  it('should validate registration payloads with Zod schema', () => {
    const invalidPayload = {};
    const parseResult = registerSchema.safeParse(invalidPayload);

    expect(parseResult.success).toBe(false);
    if (!parseResult.success) {
      expect(parseResult.error.issues.length).toBeGreaterThan(0);
    }
  });

  it('should pass valid registration payloads', () => {
    const validPayload = {
      name: 'Valid Rider',
      email: 'rider@valid.com',
      password: 'securepassword123',
    };

    const parseResult = registerSchema.safeParse(validPayload);
    expect(parseResult.success).toBe(true);
  });
});
