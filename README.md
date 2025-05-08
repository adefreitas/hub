# StackOne HUB

StackOne HUB is a React-based project that includes a web component wrapper for easy integration. This README provides instructions on how to set up, build, and run the project.

## Prerequisites

- [Node.js](https://nodejs.org/) (version specified in `.nvmrc`, e.g., `v22.14.0`)
- [npm](https://www.npmjs.com/)

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with the appropriate values for your environment.

## Development

To start the development server:

```bash
npm run dev
```

This will start a Vite development server at [http://localhost:3000](http://localhost:3000) (default port).

## Build

To build the project for production:

```bash
npm run build
```

The build output will be located in the `dist/` directory. It includes:

- `StackOneHub.esm.js`: ES module for React-based usage.
- `StackOneHub.cjs.js`: CommonJS module for React-based usage.
- `StackOneHub.web.js`: Web component bundle.

## Usage

### Using the web component

Include the `StackOneHub.web.js` file in your HTML:

```html
<script src="<TBD>/StackOneHub.web.js"></script>
<my-component></my-component>
```

### Using the React Component

Import the React component in your project:

```tsx
import StackOneHub from "@stackone/StackOneHub";

function App() {
  return <StackOneHub />;
}
```

## Usage from build output locally

### Using the Web Component locally

Include the `StackOneHub.web.js` file in your HTML:

```html
<script src="dist/StackOneHub.web.js"></script>
<my-component></my-component>
```

### Using the React Component locally

Import the React component in your project:

```tsx
import StackOneHub from "dist/StackOneHub.esm";

function App() {
  return <StackOneHub />;
}
```

## Environment Variables

The project uses environment variables defined in the `.env` file to run the development test app. Below are the variables you need to configure:

- `STACKONE_API_KEY`: Your API key.
- `ORIGIN_OWNER_ID`: The owner ID.
- `ORIGIN_OWNER_NAME`: The owner name.
- `ORIGIN_USERNAME`: The username.
- `API_URL`: The backend API URL.
- `DASHBOARD_URL`: The dashboard URL.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
