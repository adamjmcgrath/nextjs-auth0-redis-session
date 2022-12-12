import { Redis } from '@upstash/redis';
import type { SessionStorePayload, SessionStore } from '@auth0/nextjs-auth0';

class Store implements SessionStore {
  private redis: Redis;
  constructor() {
    this.redis = Redis.fromEnv();
  }
  get(id: string) {
    return this.redis.get<SessionStorePayload>(id);
  }
  async set(id: string, val: SessionStorePayload) {
    // Set the expiry of the store entry to match the expiry of the session.
    const expiryMs = val.header.exp * 1000;
    await this.redis.set<SessionStorePayload>(id, val, { pxat: expiryMs });
  }
  async delete(id: string) {
    await this.redis.del(id);
  }
}

const config = {
  session: {
    store: new Store(),
  },
};

export default config;
