import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import * as serviceWorker from "./serviceWorker";
import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
let root = createRoot(document.getElementById("root"));

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "uz",
    supportedLngs: ["eng", "ru", "uz"],
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "subdomain", "path"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/Assets/Locales/{{lng}}/translation.json",
    },
    react: { useSuspen: false },
  });

const backendOptions = {
  loadPath: "https://skerio.uz/api/",

  request: async (options, url, payload, callback) => {
    try {
      const translation = await axios.get(url);
      callback(null, {
        status: 200,
        data: JSON.stringify(translation.data),
      });
    } catch (e) {
      callback(e);
    }
  },
};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
serviceWorker.unregister();
