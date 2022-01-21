import React, { useEffect, useState } from "react";
import { auditEndPoint } from "../endpoints";

import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import "./css/app.css";

const HEIGHT_THRESHOLD = 200;

const getWindowHeight = () => {
  return window.innerHeight;
};

const demoJsonSchema = {
  "title": "浏览器内核对 CSS 的支持情况",
  "remark": "嘿，不保证数据准确性",
  "type": "page",
  "body": {
    "type": "crud",
    "draggable": true,
    "syncLocation": false,
    "api": "/amis/api/mock2/sample",
    "keepItemSelectionOnPageChange": true,
    "autoGenerateFilter": true,
    "bulkActions": [
      {
        "type": "button",
        "label": "批量删除",
        "actionType": "ajax",
        "api": "delete:/amis/api/mock2/sample/${ids|raw}",
        "confirmText": "确定要批量删除?"
      },
      {
        "type": "button",
        "label": "批量修改",
        "actionType": "dialog",
        "dialog": {
          "title": "批量编辑",
          "name": "sample-bulk-edit",
          "body": {
            "type": "form",
            "api": "/amis/api/mock2/sample/bulkUpdate2",
            "body": [
              {
                "type": "hidden",
                "name": "ids"
              },
              {
                "type": "input-text",
                "name": "engine",
                "label": "Engine"
              }
            ]
          }
        }
      }
    ],
    "quickSaveApi": "/amis/api/mock2/sample/bulkUpdate",
    "quickSaveItemApi": "/amis/api/mock2/sample/$id",
    "headerToolbar": [
      "bulkActions",
      {
        "type": "button",
        "label": "重置测试数据",
        "actionType": "ajax",
        "size": "sm",
        "api": "/amis/api/mock2/sample/reset"
      },
      "export-excel",
      {
        "type": "tpl",
        "tpl": "一共有 ${count} 行数据。",
        "className": "v-middle"
      },
      {
        "type": "columns-toggler",
        "align": "right",
        "draggable": true
      },
      {
        "type": "drag-toggler",
        "align": "right"
      }
    ],
    "footerToolbar": [
      "statistics",
      "switch-per-page",
      "pagination"
    ],
    "columns": [
      {
        "name": "id",
        "label": "ID",
        "width": 20,
        "sortable": true,
        "type": "text",
        "searchable": {
          "type": "input-text",
          "name": "id",
          "label": "主键",
          "placeholder": "输入id"
        }
      },
      {
        "name": "browser",
        "label": "Browser",
        "searchable": {
          "type": "select",
          "name": "browser",
          "label": "浏览器",
          "placeholder": "选择浏览器",
          "options": [
            {
              "label": "Internet Explorer ",
              "value": "ie"
            },
            {
              "label": "AOL browser",
              "value": "aol"
            },
            {
              "label": "Firefox",
              "value": "firefox"
            }
          ]
        }
      },
      {
        "name": "platform",
        "label": "平台",
        "popOver": {
          "trigger": "hover",
          "body": {
            "type": "tpl",
            "tpl": "就是为了演示有个叫 popOver 的功能"
          }
        },
        "sortable": true,
        "type": "text"
      },
      {
        "name": "grade",
        "label": "CSS 等级",
        "type": "select",
        "options": [
          "A",
          "B",
          "C",
          "D",
          "X"
        ]
      },
      {
        "type": "operation",
        "label": "操作",
        "width": 100,
        "buttons": [
          {
            "type": "button",
            "actionType": "ajax",
            "label": "删除",
            "confirmText": "您确认要删除?",
            "api": "delete:/amis/api/mock2/sample/$id"
          }
        ]
      }
    ]
  }
};

export default function App(props: any) {
  const [marginTop, setMarginTop] = useState(
    (getWindowHeight() - HEIGHT_THRESHOLD) / 2
  );

  const [showJsonSchemaDemo, setShowJsonSchemaDemo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMarginTop((getWindowHeight() - HEIGHT_THRESHOLD) / 2);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setShowJsonSchemaDemo(!showJsonSchemaDemo);
    if (showJsonSchemaDemo) {
    setTimeout(()=>{
        auditEndPoint(demoJsonSchema, "#hello-json");
    }, 5000);
  }
  };

  return (
    <div>
      <div id="demo">
        <h1 style={{ marginTop: marginTop }}>Hello, AIP Web UI library!</h1>
      </div>
      <div id="main-jump">
        <span style={{cursor: 'pointer'}} onClick={handleClick}>
          组件示例
        </span>
      </div> {showJsonSchemaDemo? <div id="hello-json"></div>: null}
    </div>
  );
}
