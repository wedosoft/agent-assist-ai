/**
 * Freshdesk FDK Client Type Definitions
 * The FDK client is injected by Freshdesk platform when the app runs in iframe
 */

export interface FreshdeskClient {
  /**
   * Get data from Freshdesk context
   */
  data: {
    get(key: string): Promise<any>;
  };

  /**
   * Get instance context
   */
  instance: {
    context(): Promise<{
      ticket?: {
        id: number;
        subject: string;
        status: number;
        priority: number;
        type: string;
        description: string;
        requester_id: number;
        group_id: number;
        [key: string]: any;
      };
      contact?: {
        id: number;
        name: string;
        email: string;
        [key: string]: any;
      };
      [key: string]: any;
    }>;
  };

  /**
   * Interface APIs to interact with Freshdesk
   */
  interface: {
    trigger(event: string, options?: any): Promise<any>;
  };

  /**
   * Events API for registering event handlers
   */
  events: {
    on(event: string, callback: (data: any) => void): void;
  };

  /**
   * Request API for making HTTP requests
   */
  request: {
    invokeTemplate(templateName: string, options: {
      context?: Record<string, any>;
      body?: string;
    }): Promise<{
      status: number;
      response: string;
      headers: Record<string, string>;
    }>;
  };

  /**
   * DB API for data storage
   */
  db: {
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    delete(key: string): Promise<void>;
  };
}

declare global {
  interface Window {
    app?: {
      initialized(): Promise<FreshdeskClient>;
    };
  }
}

export {};
