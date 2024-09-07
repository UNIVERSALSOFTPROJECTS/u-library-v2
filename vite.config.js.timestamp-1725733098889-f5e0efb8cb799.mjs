// vite.config.js
import { defineConfig } from "file:///C:/Users/Nix_dev/Desktop/u-library-v2/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///C:/Users/Nix_dev/Desktop/u-library-v2/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";

// package.json
var package_default = {
  name: "u-library-sass",
  private: true,
  version: "0.0.1",
  type: "module",
  svelte: "src/index.js",
  module: "dist/index.mjs",
  main: "dist/index.js",
  scripts: {
    build: "rollup -c",
    prepublishOnly: "npm run build",
    test: "jest test",
    "test:watch": "yarn test -- --watch",
    storybook: "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  devDependencies: {
    "@storybook/addon-essentials": "^7.1.0",
    "@storybook/addon-interactions": "^7.1.0",
    "@storybook/addon-links": "^7.1.0",
    "@storybook/blocks": "^7.1.0",
    "@storybook/svelte": "^7.1.0",
    "@storybook/svelte-vite": "^7.1.0",
    "@storybook/testing-library": "^0.2.0",
    "@sveltejs/vite-plugin-svelte": "^2.4.5",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    rollup: "^2.68.0",
    sass: "^1.63.6",
    storybook: "^7.1.0",
    svelte: "^4.0.3",
    "svelte-preprocess": "^5.0.4"
  },
  dependencies: {
    "@rollup/plugin-commonjs": "^25.0.3",
    "@rollup/plugin-json": "^6.0.0",
    "@rollup/plugin-node-resolve": "^15.1.0",
    "@stomp/stompjs": "^7.0.0",
    axios: "^1.4.0",
    firebase: "^10.7.1",
    "google-login-svelte": "^0.0.1",
    "mobile-device-detect": "^0.4.3",
    moment: "^2.29.4",
    "moment-timezone": "^0.5.45",
    "rollup-plugin-svelte": "^7.1.6",
    "rollup-plugin-terser": "^7.0.2",
    "svelte-i18n": "^4.0.0",
    "svelte-preprocess-sass": "^2.0.1",
    "svelte-watch-resize": "^1.0.3",
    swiper: "^11.1.4"
  }
};

// vite.config.js
var name = package_default.name.replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3").replace(/^\w/, (m) => m.toUpperCase()).replace(/-\w/g, (m) => m[1].toUpperCase());
var vite_config_default = defineConfig({
  plugins: [svelte()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTml4X2RldlxcXFxEZXNrdG9wXFxcXHUtbGlicmFyeS12MlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTml4X2RldlxcXFxEZXNrdG9wXFxcXHUtbGlicmFyeS12MlxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTml4X2Rldi9EZXNrdG9wL3UtbGlicmFyeS12Mi92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnXHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xyXG5cclxuY29uc3QgbmFtZSA9IHBrZy5uYW1lXHJcblx0LnJlcGxhY2UoL14oQFxcUytcXC8pPyhzdmVsdGUtKT8oXFxTKykvLCAnJDMnKVxyXG5cdC5yZXBsYWNlKC9eXFx3LywgbSA9PiBtLnRvVXBwZXJDYXNlKCkpXHJcblx0LnJlcGxhY2UoLy1cXHcvZywgbSA9PiBtWzFdLnRvVXBwZXJDYXNlKCkpO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbc3ZlbHRlKCldLFxyXG4gIFxyXG59KVxyXG4iLCAie1xyXG4gIFwibmFtZVwiOiBcInUtbGlicmFyeS1zYXNzXCIsXHJcbiAgXCJwcml2YXRlXCI6IHRydWUsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcInN2ZWx0ZVwiOiBcInNyYy9pbmRleC5qc1wiLFxyXG4gIFwibW9kdWxlXCI6IFwiZGlzdC9pbmRleC5tanNcIixcclxuICBcIm1haW5cIjogXCJkaXN0L2luZGV4LmpzXCIsXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiYnVpbGRcIjogXCJyb2xsdXAgLWNcIixcclxuICAgIFwicHJlcHVibGlzaE9ubHlcIjogXCJucG0gcnVuIGJ1aWxkXCIsXHJcbiAgICBcInRlc3RcIjogXCJqZXN0IHRlc3RcIixcclxuICAgIFwidGVzdDp3YXRjaFwiOiBcInlhcm4gdGVzdCAtLSAtLXdhdGNoXCIsXHJcbiAgICBcInN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBkZXYgLXAgNjAwNlwiLFxyXG4gICAgXCJidWlsZC1zdG9yeWJvb2tcIjogXCJzdG9yeWJvb2sgYnVpbGRcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWVzc2VudGlhbHNcIjogXCJeNy4xLjBcIixcclxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1pbnRlcmFjdGlvbnNcIjogXCJeNy4xLjBcIixcclxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1saW5rc1wiOiBcIl43LjEuMFwiLFxyXG4gICAgXCJAc3Rvcnlib29rL2Jsb2Nrc1wiOiBcIl43LjEuMFwiLFxyXG4gICAgXCJAc3Rvcnlib29rL3N2ZWx0ZVwiOiBcIl43LjEuMFwiLFxyXG4gICAgXCJAc3Rvcnlib29rL3N2ZWx0ZS12aXRlXCI6IFwiXjcuMS4wXCIsXHJcbiAgICBcIkBzdG9yeWJvb2svdGVzdGluZy1saWJyYXJ5XCI6IFwiXjAuMi4wXCIsXHJcbiAgICBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjogXCJeMi40LjVcIixcclxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXHJcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcclxuICAgIFwicm9sbHVwXCI6IFwiXjIuNjguMFwiLFxyXG4gICAgXCJzYXNzXCI6IFwiXjEuNjMuNlwiLFxyXG4gICAgXCJzdG9yeWJvb2tcIjogXCJeNy4xLjBcIixcclxuICAgIFwic3ZlbHRlXCI6IFwiXjQuMC4zXCIsXHJcbiAgICBcInN2ZWx0ZS1wcmVwcm9jZXNzXCI6IFwiXjUuMC40XCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHJvbGx1cC9wbHVnaW4tY29tbW9uanNcIjogXCJeMjUuMC4zXCIsXHJcbiAgICBcIkByb2xsdXAvcGx1Z2luLWpzb25cIjogXCJeNi4wLjBcIixcclxuICAgIFwiQHJvbGx1cC9wbHVnaW4tbm9kZS1yZXNvbHZlXCI6IFwiXjE1LjEuMFwiLFxyXG4gICAgXCJAc3RvbXAvc3RvbXBqc1wiOiBcIl43LjAuMFwiLFxyXG4gICAgXCJheGlvc1wiOiBcIl4xLjQuMFwiLFxyXG4gICAgXCJmaXJlYmFzZVwiOiBcIl4xMC43LjFcIixcclxuICAgIFwiZ29vZ2xlLWxvZ2luLXN2ZWx0ZVwiOiBcIl4wLjAuMVwiLFxyXG4gICAgXCJtb2JpbGUtZGV2aWNlLWRldGVjdFwiOiBcIl4wLjQuM1wiLFxyXG4gICAgXCJtb21lbnRcIjogXCJeMi4yOS40XCIsXHJcbiAgICBcIm1vbWVudC10aW1lem9uZVwiOiBcIl4wLjUuNDVcIixcclxuICAgIFwicm9sbHVwLXBsdWdpbi1zdmVsdGVcIjogXCJeNy4xLjZcIixcclxuICAgIFwicm9sbHVwLXBsdWdpbi10ZXJzZXJcIjogXCJeNy4wLjJcIixcclxuICAgIFwic3ZlbHRlLWkxOG5cIjogXCJeNC4wLjBcIixcclxuICAgIFwic3ZlbHRlLXByZXByb2Nlc3Mtc2Fzc1wiOiBcIl4yLjAuMVwiLFxyXG4gICAgXCJzdmVsdGUtd2F0Y2gtcmVzaXplXCI6IFwiXjEuMC4zXCIsXHJcbiAgICBcInN3aXBlclwiOiBcIl4xMS4xLjRcIlxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJTLFNBQVMsb0JBQW9CO0FBQ3hVLFNBQVMsY0FBYzs7O0FDRHZCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixRQUFVO0FBQUEsRUFDVixRQUFVO0FBQUEsRUFDVixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxXQUFhO0FBQUEsSUFDYixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsK0JBQStCO0FBQUEsSUFDL0IsaUNBQWlDO0FBQUEsSUFDakMsMEJBQTBCO0FBQUEsSUFDMUIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsMEJBQTBCO0FBQUEsSUFDMUIsOEJBQThCO0FBQUEsSUFDOUIsZ0NBQWdDO0FBQUEsSUFDaEMsT0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsUUFBVTtBQUFBLElBQ1YsTUFBUTtBQUFBLElBQ1IsV0FBYTtBQUFBLElBQ2IsUUFBVTtBQUFBLElBQ1YscUJBQXFCO0FBQUEsRUFDdkI7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCwyQkFBMkI7QUFBQSxJQUMzQix1QkFBdUI7QUFBQSxJQUN2QiwrQkFBK0I7QUFBQSxJQUMvQixrQkFBa0I7QUFBQSxJQUNsQixPQUFTO0FBQUEsSUFDVCxVQUFZO0FBQUEsSUFDWix1QkFBdUI7QUFBQSxJQUN2Qix3QkFBd0I7QUFBQSxJQUN4QixRQUFVO0FBQUEsSUFDVixtQkFBbUI7QUFBQSxJQUNuQix3QkFBd0I7QUFBQSxJQUN4Qix3QkFBd0I7QUFBQSxJQUN4QixlQUFlO0FBQUEsSUFDZiwwQkFBMEI7QUFBQSxJQUMxQix1QkFBdUI7QUFBQSxJQUN2QixRQUFVO0FBQUEsRUFDWjtBQUNGOzs7QUQvQ0EsSUFBTSxPQUFPLGdCQUFJLEtBQ2YsUUFBUSw2QkFBNkIsSUFBSSxFQUN6QyxRQUFRLE9BQU8sT0FBSyxFQUFFLFlBQVksQ0FBQyxFQUNuQyxRQUFRLFFBQVEsT0FBSyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUM7QUFHekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUVwQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
