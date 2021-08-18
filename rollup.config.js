import svg from "rollup-plugin-svg";

export default {
  external: ["maplibre-gl", "@aws-amplify/core", "@aws-amplify/geo"],
  output: {
    globals: {
      "maplibre-gl": "maplibregl",
      "@aws-amplify/core": "aws_amplify_core",
      "@aws-amplify/geo": "aws_amplify_geo",
    },
  },
  plugins: [svg()],
};
