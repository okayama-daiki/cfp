import { render } from "preact";
import { ConfigProvider } from "antd";
import jaJP from "antd/locale/ja_JP";
import { App } from "./App.tsx";
import "antd/dist/reset.css";
import "./style.css";

render(
  <ConfigProvider
    locale={jaJP}
    theme={{
      token: {
        colorPrimary: "#1c1c1c",
        colorLink: "#1c1c1c",
        colorLinkHover: "#000000",
        colorText: "#1c1c1c",
        colorTextSecondary: "#737373",
        colorBorder: "#e6e6e6",
        colorBorderSecondary: "#e6e6e6",
        colorBgLayout: "#ffffff",
        borderRadius: 8,
        controlHeight: 36,
        fontSize: 13,
        fontFamily: "var(--app-font)",
      },
      components: {
        Table: {
          headerBg: "#f9f9f9",
          headerColor: "#737373",
          headerSplitColor: "transparent",
          cellPaddingBlockSM: 10,
          cellPaddingInlineSM: 16,
        },
      },
    }}
  >
    <App />
  </ConfigProvider>,
  document.getElementById("app")!,
);
