import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

export function downloadJsonFile(content: string, filename = 'payload.json') {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const SAMPLE_JSONS: Record<string, { name: string; description: string; json: string }> = {
  ecommerce: {
    name: 'E-commerce API',
    description: 'Product catalog with inventory, tags, and reviews',
    json: JSON.stringify(
      {
        catalogId: "cat_99841",
        version: "2026.04",
        currency: "USD",
        store: {
          name: "OmniTech Hardware",
          region: "us-east-1",
          active: true
        },
        products: [
          {
            id: "sku_ultra_4k",
            title: "Pro 4K OLED Monitor 32-inch",
            price: 849.99,
            stock: 42,
            ratings: {
              average: 4.8,
              totalReviews: 320
            },
            tags: ["display", "gaming", "oled", "hdr1000"],
            specifications: {
              resolution: "3840x2160",
              refreshRateHz: 240,
              inputs: ["HDMI 2.1", "DisplayPort 2.1", "USB-C 90W PD"]
            }
          },
          {
            id: "sku_mech_kb",
            title: "Zero-Latency Optical Mechanical Keyboard",
            price: 189.5,
            stock: 115,
            ratings: {
              average: 4.9,
              totalReviews: 1240
            },
            tags: ["peripherals", "hot-swap", "rgb"],
            specifications: {
              switchType: "Linear Optical Red",
              pollingRateHz: 8000,
              connectivity: ["2.4GHz Wireless", "Bluetooth 5.3", "Detachable Type-C"]
            }
          }
        ],
        metadata: {
          generatedAt: "2026-09-08T08:00:00.000Z",
          cacheControl: "max-age=3600, s-maxage=7200",
          serverLatencyMs: 8.4
        }
      },
      null,
      2
    )
  },
  userProfile: {
    name: 'User Profile & Permissions',
    description: 'RBAC user object with nested auth tokens and preferences',
    json: JSON.stringify(
      {
        user: {
          id: "usr_78310bc9",
          username: "alex.mercer",
          email: "alex.mercer@cloudinfra.io",
          role: "Principal Engineer",
          verified: true,
          security: {
            mfaEnabled: true,
            twoFactorMethod: "WebAuthn / YubiKey",
            lastLoginIp: "198.51.100.42",
            sessionExpiresAt: 1788780000
          },
          preferences: {
            theme: "midnight-dark",
            notifications: {
              email: false,
              slackAlerts: true,
              criticalIncidentSms: true
            },
            preferredRegion: "eu-central-1"
          },
          teams: [
            { id: "team_sre", name: "Site Reliability & Core Platform", permissions: ["root", "deploy", "rollback"] },
            { id: "team_sec", name: "Security Architecture", permissions: ["audit", "keys:rotate"] }
          ]
        }
      },
      null,
      2
    )
  },
  geojson: {
    name: 'GeoJSON FeatureCollection',
    description: 'Geospatial coordinates and topological properties',
    json: JSON.stringify(
      {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122.4194, 37.7749]
            },
            properties: {
              city: "San Francisco",
              stationCode: "SFO-HUB-1",
              status: "operational",
              uptimePercent: 99.998
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-0.1278, 51.5074]
            },
            properties: {
              city: "London",
              stationCode: "LON-CORE-3",
              status: "operational",
              uptimePercent: 99.995
            }
          }
        ]
      },
      null,
      2
    )
  }
};
