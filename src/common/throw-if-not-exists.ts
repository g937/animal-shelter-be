import { UnauthorizedException } from '@nestjs/common';

export function throwIfNotExits(
  item: unknown,
  error = UnauthorizedException,
): void {
  if (!item) {
    throw new error();
  }
}