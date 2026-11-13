// vite.config.js
import { defineConfig } from "file:///d:/Proyectos%20UniversalSoft/u-library-v2/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///d:/Proyectos%20UniversalSoft/u-library-v2/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";

// package.json
var package_default = {
  name: "u-library-sass",
  private: true,
  files: [
    "src"
  ],
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
    "camel-case": "^5.0.0",
    "crypto-js": "^4.2.0",
    firebase: "^10.7.1",
    "mobile-device-detect": "^0.4.3",
    moment: "^2.29.4",
    "moment-timezone": "^0.5.45",
    "rollup-plugin-svelte": "^7.1.6",
    "rollup-plugin-terser": "^7.0.2",
    "svelte-i18n": "^4.0.0",
    "svelte-preprocess-sass": "^2.0.1",
    "svelte-turnstile": "^0.10.0",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiZDpcXFxcUHJveWVjdG9zIFVuaXZlcnNhbFNvZnRcXFxcdS1saWJyYXJ5LXYyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJkOlxcXFxQcm95ZWN0b3MgVW5pdmVyc2FsU29mdFxcXFx1LWxpYnJhcnktdjJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2Q6L1Byb3llY3RvcyUyMFVuaXZlcnNhbFNvZnQvdS1saWJyYXJ5LXYyL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSAnQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZSdcclxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbic7XHJcblxyXG5jb25zdCBuYW1lID0gcGtnLm5hbWVcclxuXHQucmVwbGFjZSgvXihAXFxTK1xcLyk/KHN2ZWx0ZS0pPyhcXFMrKS8sICckMycpXHJcblx0LnJlcGxhY2UoL15cXHcvLCBtID0+IG0udG9VcHBlckNhc2UoKSlcclxuXHQucmVwbGFjZSgvLVxcdy9nLCBtID0+IG1bMV0udG9VcHBlckNhc2UoKSk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtzdmVsdGUoKV0sXHJcbiAgXHJcbn0pXHJcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwidS1saWJyYXJ5LXNhc3NcIixcclxuICBcInByaXZhdGVcIjogdHJ1ZSxcclxuICBcImZpbGVzXCI6IFtcclxuICAgIFwic3JjXCJcclxuICBdLFxyXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJzdmVsdGVcIjogXCJzcmMvaW5kZXguanNcIixcclxuICBcIm1vZHVsZVwiOiBcImRpc3QvaW5kZXgubWpzXCIsXHJcbiAgXCJtYWluXCI6IFwiZGlzdC9pbmRleC5qc1wiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImJ1aWxkXCI6IFwicm9sbHVwIC1jXCIsXHJcbiAgICBcInByZXB1Ymxpc2hPbmx5XCI6IFwibnBtIHJ1biBidWlsZFwiLFxyXG4gICAgXCJ0ZXN0XCI6IFwiamVzdCB0ZXN0XCIsXHJcbiAgICBcInRlc3Q6d2F0Y2hcIjogXCJ5YXJuIHRlc3QgLS0gLS13YXRjaFwiLFxyXG4gICAgXCJzdG9yeWJvb2tcIjogXCJzdG9yeWJvb2sgZGV2IC1wIDYwMDZcIixcclxuICAgIFwiYnVpbGQtc3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGJ1aWxkXCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1lc3NlbnRpYWxzXCI6IFwiXjcuMS4wXCIsXHJcbiAgICBcIkBzdG9yeWJvb2svYWRkb24taW50ZXJhY3Rpb25zXCI6IFwiXjcuMS4wXCIsXHJcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tbGlua3NcIjogXCJeNy4xLjBcIixcclxuICAgIFwiQHN0b3J5Ym9vay9ibG9ja3NcIjogXCJeNy4xLjBcIixcclxuICAgIFwiQHN0b3J5Ym9vay9zdmVsdGVcIjogXCJeNy4xLjBcIixcclxuICAgIFwiQHN0b3J5Ym9vay9zdmVsdGUtdml0ZVwiOiBcIl43LjEuMFwiLFxyXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RpbmctbGlicmFyeVwiOiBcIl4wLjIuMFwiLFxyXG4gICAgXCJAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlXCI6IFwiXjIuNC41XCIsXHJcbiAgICBcInJlYWN0XCI6IFwiXjE4LjIuMFwiLFxyXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXHJcbiAgICBcInJvbGx1cFwiOiBcIl4yLjY4LjBcIixcclxuICAgIFwic2Fzc1wiOiBcIl4xLjYzLjZcIixcclxuICAgIFwic3Rvcnlib29rXCI6IFwiXjcuMS4wXCIsXHJcbiAgICBcInN2ZWx0ZVwiOiBcIl40LjAuM1wiLFxyXG4gICAgXCJzdmVsdGUtcHJlcHJvY2Vzc1wiOiBcIl41LjAuNFwiXHJcbiAgfSxcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkByb2xsdXAvcGx1Z2luLWNvbW1vbmpzXCI6IFwiXjI1LjAuM1wiLFxyXG4gICAgXCJAcm9sbHVwL3BsdWdpbi1qc29uXCI6IFwiXjYuMC4wXCIsXHJcbiAgICBcIkByb2xsdXAvcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xNS4xLjBcIixcclxuICAgIFwiQHN0b21wL3N0b21wanNcIjogXCJeNy4wLjBcIixcclxuICAgIFwiYXhpb3NcIjogXCJeMS40LjBcIixcclxuICAgIFwiY2FtZWwtY2FzZVwiOiBcIl41LjAuMFwiLFxyXG4gICAgXCJjcnlwdG8tanNcIjogXCJeNC4yLjBcIixcclxuICAgIFwiZmlyZWJhc2VcIjogXCJeMTAuNy4xXCIsXHJcbiAgICBcIm1vYmlsZS1kZXZpY2UtZGV0ZWN0XCI6IFwiXjAuNC4zXCIsXHJcbiAgICBcIm1vbWVudFwiOiBcIl4yLjI5LjRcIixcclxuICAgIFwibW9tZW50LXRpbWV6b25lXCI6IFwiXjAuNS40NVwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXN2ZWx0ZVwiOiBcIl43LjEuNlwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXRlcnNlclwiOiBcIl43LjAuMlwiLFxyXG4gICAgXCJzdmVsdGUtaTE4blwiOiBcIl40LjAuMFwiLFxyXG4gICAgXCJzdmVsdGUtcHJlcHJvY2Vzcy1zYXNzXCI6IFwiXjIuMC4xXCIsXHJcbiAgICBcInN2ZWx0ZS10dXJuc3RpbGVcIjogXCJeMC4xMC4wXCIsXHJcbiAgICBcInN2ZWx0ZS13YXRjaC1yZXNpemVcIjogXCJeMS4wLjNcIixcclxuICAgIFwic3dpcGVyXCI6IFwiXjExLjEuNFwiXHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1MsU0FBUyxvQkFBb0I7QUFDNVUsU0FBUyxjQUFjOzs7QUNEdkI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLE9BQVM7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsUUFBVTtBQUFBLEVBQ1YsUUFBVTtBQUFBLEVBQ1YsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsZ0JBQWtCO0FBQUEsSUFDbEIsTUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsV0FBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLCtCQUErQjtBQUFBLElBQy9CLGlDQUFpQztBQUFBLElBQ2pDLDBCQUEwQjtBQUFBLElBQzFCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLDBCQUEwQjtBQUFBLElBQzFCLDhCQUE4QjtBQUFBLElBQzlCLGdDQUFnQztBQUFBLElBQ2hDLE9BQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFFBQVU7QUFBQSxJQUNWLE1BQVE7QUFBQSxJQUNSLFdBQWE7QUFBQSxJQUNiLFFBQVU7QUFBQSxJQUNWLHFCQUFxQjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsMkJBQTJCO0FBQUEsSUFDM0IsdUJBQXVCO0FBQUEsSUFDdkIsK0JBQStCO0FBQUEsSUFDL0Isa0JBQWtCO0FBQUEsSUFDbEIsT0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsVUFBWTtBQUFBLElBQ1osd0JBQXdCO0FBQUEsSUFDeEIsUUFBVTtBQUFBLElBQ1YsbUJBQW1CO0FBQUEsSUFDbkIsd0JBQXdCO0FBQUEsSUFDeEIsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsMEJBQTBCO0FBQUEsSUFDMUIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsUUFBVTtBQUFBLEVBQ1o7QUFDRjs7O0FEcERBLElBQU0sT0FBTyxnQkFBSSxLQUNmLFFBQVEsNkJBQTZCLElBQUksRUFDekMsUUFBUSxPQUFPLE9BQUssRUFBRSxZQUFZLENBQUMsRUFDbkMsUUFBUSxRQUFRLE9BQUssRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDO0FBR3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFFcEIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
