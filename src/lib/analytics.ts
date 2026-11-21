/**
 * Google Analytics 4 (GA4) Custom Event Dispatcher
 * Tracks key business conversions: Exporter registration, Sample requests, Quote requests, Demand posting
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "[PLACEHOLDER-GA4-ID]";

export type GAEvent =
  | {
      name: "exporter_registration";
      params: { step: string; category?: string };
    }
  | {
      name: "sample_request_submitted";
      params: { product: string; destination_country: string };
    }
  | {
      name: "quote_request_submitted";
      params: { product: string; quantity_mt: number; port: string };
    }
  | {
      name: "requirement_posted";
      params: { product: string; quantity: string; destination: string };
    }
  | {
      name: "document_room_engagement";
      params: { action: string };
    }
  | {
      name: "freight_calculator_used";
      params: { origin_port: string; dest_port: string; container_type: string };
    };

export function trackGAEvent({ name, params }: GAEvent) {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (type: string, name: string, params: Record<string, unknown>) => void }).gtag(
      "event",
      name,
      params
    );
  }
}
