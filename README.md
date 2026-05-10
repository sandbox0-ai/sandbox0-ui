# sandbox0-ui

Shared Sandbox0 pixel UI primitives, global styles, and Tailwind theme preset.

## Usage

Install the package and import the global stylesheet once in the app root:

```tsx
import "@sandbox0/ui/globals.css";
```

Use the Tailwind preset from the consuming app's Tailwind config:

```ts
import sandbox0UIPreset from "@sandbox0/ui/tailwind-preset";

export default {
  presets: [sandbox0UIPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@sandbox0/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
```

Then import primitives from `@sandbox0/ui`:

```tsx
import { PixelButton, PixelCard } from "@sandbox0/ui";
```

## Development

```bash
npm install
npm run lint
npm run build
```
