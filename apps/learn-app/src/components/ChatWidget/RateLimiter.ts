/**
 * Client-side rate limiter for Gemini API (15 RPM free tier)
 *
 * Tracks requests per minute and queues excess requests
 */

export class RateLimiter {
  private requestTimes: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private queue: Array<() => void> = [];
  private processing = false;

  constructor(maxRequests: number = 15, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Get current request count in the time window
   */
  getRequestCount(): number {
    this.cleanOldRequests();
    return this.requestTimes.length;
  }

  /**
   * Check if we're approaching the rate limit
   */
  isApproachingLimit(): boolean {
    return this.getRequestCount() >= this.maxRequests - 1;
  }

  /**
   * Check if rate limit is exceeded
   */
  isLimitExceeded(): boolean {
    return this.getRequestCount() >= this.maxRequests;
  }

  /**
   * Remove requests older than the time window
   */
  private cleanOldRequests(): void {
    const now = Date.now();
    this.requestTimes = this.requestTimes.filter(
      (time) => now - time < this.windowMs
    );
  }

  /**
   * Execute a function with rate limiting
   * Queues the request if limit is exceeded
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const executeRequest = async () => {
        try {
          this.requestTimes.push(Date.now());
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.processQueue();
        }
      };

      if (this.isLimitExceeded()) {
        // Queue the request
        this.queue.push(executeRequest);
      } else {
        // Execute immediately
        executeRequest();
      }
    });
  }

  /**
   * Process queued requests
   */
  private processQueue(): void {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    // Wait until we can process next request
    const checkAndProcess = () => {
      if (!this.isLimitExceeded() && this.queue.length > 0) {
        const nextRequest = this.queue.shift();
        if (nextRequest) {
          nextRequest();
        }
      }

      if (this.queue.length > 0) {
        // Check again in 1 second
        setTimeout(checkAndProcess, 1000);
      } else {
        this.processing = false;
      }
    };

    setTimeout(checkAndProcess, 1000);
  }

  /**
   * Get time until next available slot (in ms)
   */
  getTimeUntilNextSlot(): number {
    if (!this.isLimitExceeded()) {
      return 0;
    }

    this.cleanOldRequests();
    if (this.requestTimes.length === 0) {
      return 0;
    }

    const oldestRequest = Math.min(...this.requestTimes);
    const timeUntilExpiry = this.windowMs - (Date.now() - oldestRequest);
    return Math.max(0, timeUntilExpiry);
  }

  /**
   * Get queue length
   */
  getQueueLength(): number {
    return this.queue.length;
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();
