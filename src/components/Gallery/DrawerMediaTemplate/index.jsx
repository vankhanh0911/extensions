// Libraries
import React, { useEffect } from "react";
import { Drawer } from "antd";

// Constants
import { _user_id } from "../constants";

export const DrawerMediaTemplate = (props) => {
  const { visible, onClose, selectedTemplate, onApplyTemplate } = props;

  useEffect(() => {
    const listener = (event) => {
      const { actionType, data } = event.data;
      switch (actionType) {
        case "onCancelMediaTemplate": {
          onClose();
          break;
        }
        case "onSaveMediaTemplate": {
          const selectedTemplate = { ...data };
          onApplyTemplate(selectedTemplate);
          break;
        }
        default: {
          console.log({ actionType, data });
        }
      }
    };

    window.addEventListener("message", listener);

    return () => window.removeEventListener("message", listener);
  }, []);

  const onPostMessage = () => {
    const mediaTemplateIframe = document.getElementById(
      "media-template-iframe"
    );
    if (mediaTemplateIframe) {
      setTimeout(() => {
        mediaTemplateIframe.contentWindow.postMessage(
          {
            actionType: "setMediaTemplateDetail",
            data: { ...selectedTemplate.properties },
          },
          "*"
        );
      }, 500);
    }
  };

  return (
    <Drawer
      // title="Basic Drawer"
      closable={false}
      maskClosable={false}
      placement="right"
      visible={visible}
      onClose={onClose}
      bodyStyle={{ padding: 0 }}
      width="90vw"
      destroyOnClose
    >
      <iframe
        id="media-template-iframe"
        title="media-tempalte-iframe"
        src={`https://sandbox-media-template.antsomi.com/cdp/#/${_user_id}/media-template/embed`}
        allowFullScreen
        width="100%"
        height="100%"
        onLoad={onPostMessage}
      />
    </Drawer>
  );
};
