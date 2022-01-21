import { render as amisRender } from "amis";
import ReactDOM from "react-dom";
import { Schema } from "amis/lib/types";

export type auditEndPointFunc = (
  jsonSchema: Schema,
  selector: string | HTMLElement
) => JSX.Element;

const auditEndPoint: auditEndPointFunc = (
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

export {
  auditEndPoint,
}

// bind to window
(window as any).auditEndPoint = auditEndPoint;
(window as any).embedAUI = auditEndPoint;
