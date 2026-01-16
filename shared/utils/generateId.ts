import { randomUUID } from 'crypto'

export function generateUniqueId() {
  const id = crypto.randomUUID()

  return id;
}
