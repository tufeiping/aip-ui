import { render as amisRender } from "amis";
import ReactDOM from "react-dom";
import { Schema } from "amis/lib/types";
import { fetcherConfig, RenderOptions } from "amis/lib/factory";
import { RootRenderProps } from "amis/lib/Root";
import axios from "axios";

export type embedFunc = (
  jsonSchema: Schema,
  selector: string | HTMLElement
) => JSX.Element;

const defaultOptions: RenderOptions = {
  // 下面三个接口必须实现
  fetcher: ({
    url, // 接口地址
    method, // 请求方法 get、post、put、delete
    data, // 请求数据
    responseType,
    config, // 其他配置
    headers, // 请求头
  }: any) => {
    config = config || {};
    config.withCredentials = true;
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
      config.cancelToken = new (axios as any).CancelToken(
        config.cancelExecutor
      );
    }

    config.headers = headers || {};

    if (method !== "post" && method !== "put" && method !== "patch") {
      if (data) {
        config.params = data;
      }

      return (axios as any)[method](url, config);
    } else if (data && data instanceof FormData) {
      config.headers = config.headers || {};
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (
      data &&
      typeof data !== "string" &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      data = JSON.stringify(data);
      config.headers = config.headers || {};
      config.headers["Content-Type"] = "application/json";
    }

    return (axios as any)[method](url, data, config);
  },
  isCancel() {
    return false;
  },
  copy(contents: string) {
    console.error("copy contents", contents);
  },
};

/**
export function render(
  schema: Schema,
  props: RootRenderProps = {},
  options: RenderOptions = {},
  pathPrefix: string = ''
): JSX.Element
 */

const jsonSchemaRender: (
  schema: Schema,
  props?: RootRenderProps,
  options?: RenderOptions,
  pathPrefix?: string
) => JSX.Element = (schema, props, options, pathPrefix) => {
  if (!options) {
    options = defaultOptions;
  }
  return amisRender(schema, props, options, pathPrefix);
};

const embed: embedFunc = (
  jsonSchema: Schema,
  selector: string | HTMLElement
): JSX.Element => {
  let comp = amisRender(jsonSchema);
  if (typeof selector === "string") {
    let selectorStr = selector;
    selector = document.querySelector(selectorStr) as HTMLElement;
    if (selector === null) {
      throw new Error(`${selectorStr} not found`);
    }
  }
  try {
    ReactDOM.unmountComponentAtNode(selector as Element);
  } catch (e) {}
  ReactDOM.render(comp, selector);
  return comp;
};

export { embed, jsonSchemaRender };

// bind to window
(window as any).embed = embed;
