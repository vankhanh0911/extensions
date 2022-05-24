// Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Typography, Tabs } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

// Styles
// import "./style.css";
import {
  BlockType,
  GridContainer,
  GridItem,
  MediaTemplateSelect,
  SavedBlock,
  StyledSpin,
  TemplateBlock,
  WrapperBlockTypes,
} from "./styles";

// Constants
import {
  LAYOUT_TEMPLATE,
  GALLERY,
  MY_TEMPLATE,
  TEMPLATE_TYPE,
  token,
  _user_id,
  _account_id,
} from "./constants";

// Components
import { DrawerMediaTemplate } from "./DrawerMediaTemplate";

const { Text } = Typography;
const { TabPane } = Tabs;

const Gallery = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(TEMPLATE_TYPE.gallery.value);
  const [types, setTypes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({
    properties: {},
    template_name: "",
    template_setting: {
      rulesets: [],
    },
    template_type: null,
    viewPages: [],
  });

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const url = `https://sandbox-media-template.antsomi.com/cdp/api/v1/media-template-type/index?&_token=${token}&_user_id=${_user_id}&_account_id=${_account_id}&portalId=33167&languageCode=en`;

    axios.get(url).then((res) => {
      if (res && res.data && res.data.data) {
        setTypes(res.data.data);
        setSelectedType(res.data.data[0].template_type_id);
      }
    });

    const interval = setInterval(() => { 
      const selector = document.querySelector("#open-iframe-media-template");
      
      if (selector) {
        clearInterval(interval);
        selector.addEventListener("click", () => {
          setIsModalVisible(true);
        });
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (activeTab && selectedType) {
      getTemplates({ tab: activeTab, type: selectedType });
    }
  }, [activeTab, selectedType]);

  useEffect(() => {
    setIsModalVisible(props.isModalVisible);
  }, [props.isModalVisible]);

  // Services
  const getTemplates = ({ tab, type }) => {
    setLoadingTemplates(true);
    const query = `?limit=${10}&page=${1}&columns=["properties","template_setting","thumbnail"]&filter=[{"TEMPLATE_TYPE":{"is":"${type}"}}]`;

    const url =
      tab === MY_TEMPLATE
        ? `https://sandbox-media-template.antsomi.com/cdp/api/v1/media-template/performance${query}&_token=${token}&_user_id=${_user_id}&_account_id=${_account_id}&portalId=33167&languageCode=en`
        : `https://sandbox-media-template.antsomi.com/cdp/api/v1/gallery/performance${query}&_token=${token}&_user_id=${_user_id}&_account_id=${_account_id}&portalId=33167&languageCode=en`;

    axios.get(url).then((res) => {
      if (res && res.data && res.data.data && res.data.data.body) {
        const data =
          activeTab === MY_TEMPLATE
            ? res.data.data.body || []
            : (res.data.data.body || []).map((item) => ({
                ...item,
                template_id: item.media_gallery_id,
                template_name: item.media_gallery_name,
              }));

        setTemplates(data);
        setLoadingTemplates(false);
      }
    });
  };

  // Handlers
  const onSelectType = (type) => {
    setSelectedType(type);
  };

  const onChangeTab = (tab) => {
    setActiveTab(tab);
  };

  const onSelectTemplate = (template) => {
    setSelectedTemplate(template);
    onOpenDrawer();
  };

  const onOpenDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onApplyTemplate = (template) => {
    setSelectedTemplate(template);
    setIsSaved(true);
    onCloseDrawer();
  };

  const onEditTemplate = () => {
    onOpenDrawer();
  };

  const onResetSelectedTemplate = () => {
    const template = {
      properties: {},
      template_name: "",
      template_setting: {
        rulesets: [],
      },
      template_type: null,
      viewPages: [],
    };

    setSelectedTemplate(template);
    setIsSaved(false);
  };

  const onCloseDrawer = (event) => {
    if (!event || (event && event.key !== "Escape")) setIsDrawerVisible(false);
  };

  const onPreview = (
    d,
    templateId,
    isGallery = false,
    isPreview = false,
    env = "production"
  ) => {
    const s = d.createElement("script");
    s.type = "text/javascript";
    s.id = "antsomi-cdp-optin";
    // s.src = isProduction()
    //   ? '//st-media-template.antsomi.com/js/media.min.js'
    //   : '//sandbox-template.ants.vn/khanhhv/media.min.js';
    s.src = "//sandbox-template.ants.vn/khanhhv/media.min.js";
    s.async = true;
    s.dataset.antsomiTemplateId = templateId;
    s.dataset.env = env;
    s.dataset.isPreview = isPreview;
    s.dataset.isGallery = isGallery;
    d.getElementsByTagName("head")[0].appendChild(s);
  };

  const previewCampaign = (templateId, zoneSelector, zoneRenderType = 'replace', isGallery = false, isPreview = false, env = 'production') => {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.id = 'antsomi-cdp-optin';
    s.src =
      env === 'production'
        ? '//st-media-template.antsomi.com/js/media.min.js'
        : '//sandbox-template.ants.vn/khanhhv/media.min.js';
    s.async = true;
    s.dataset.antsomiTemplateId = templateId;
    s.dataset.env = env;
    s.dataset.zoneSelector = zoneSelector;
    s.dataset.isPreview = String(isPreview);
    s.dataset.isGallery = String(isGallery);
    zoneRenderType && (s.dataset.zoneRenderType = zoneRenderType);
    document.getElementsByTagName('head')[0].appendChild(s);
  };

  const onClickPreviewTemplate = () => {
    setIsModalVisible(false);
    previewCampaign(
        '',
      props.selector || '',
        'replace',
        false,
        true,
        'sandbox',
    );
    
    const postMess = e => {
        if (e?.data?.type === 'preview-antsomi-cdp-campaign-wating') {
          setTimeout(() => {
            window.postMessage(
              {
                ...selectedTemplate.template_setting,
                views: selectedTemplate.viewPages,
                messageType: 'preview-antsomi-cdp-campaign',
                targetScript: e?.data?.id,
              },
              '*',
            );
          }, 100);

          window.removeEventListener('message', postMess);
        }
      };
      window.addEventListener('message', postMess);

      setTimeout(() => {
        window.removeEventListener('message', postMess);
      }, 3000);
   };

  // Renders
  const renderTypes = () => {
    return (
      <WrapperBlockTypes>
        {types.map((item) => (
          <BlockType
            key={item.template_type_id}
            isSelected={selectedType === item.template_type_id}
            onClick={() => onSelectType(item.template_type_id)}
          >
            <img
              src={`${LAYOUT_TEMPLATE[item.template_code].img}`}
              alt={item.template_code}
              width="94px"
              // height="74px"
            />
            <Text className="m-bottom-0 text-center">
              {LAYOUT_TEMPLATE[item.template_code].label}
            </Text>
          </BlockType>
        ))}
      </WrapperBlockTypes>
    );
  };

  const renderTemplates = () => {
    return (
      <StyledSpin
        spinning={loadingTemplates}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <GridContainer>
          {templates.map((template) => (
            <GridItem key={template.template_id}>
              <TemplateBlock className="template-block">
                <div className="layer" />
                <img
                  width="100%"
                  src={template.thumbnail}
                  alt={template.template_name}
                />
                <div className="template-buttons">
                  <Button
                    type="primary"
                    // onClick={() => onOpenDrawer(true)}
                    onClick={() => onSelectTemplate(template)}
                    className="btn-template"
                  >
                    USE TEMPLATE
                  </Button>
                  <Button
                    theme="outline"
                    onClick={() =>
                      onPreview(
                        document,
                        template.template_id,
                        activeTab === GALLERY,
                        true
                      )
                    }
                    className="btn-preview"
                  >
                    Preview
                  </Button>
                </div>
              </TemplateBlock>
              <p className="p-all-0 text-center">{template.template_name}</p>
            </GridItem>
          ))}
        </GridContainer>
      </StyledSpin>
    );
  };

  const renderSavedBlock = () => {
    return (
      <SavedBlock>
        <img
          src={selectedTemplate.properties.thumbnail}
          alt={selectedTemplate.properties.name}
          width="100%"
        />
        <div className="btn-group">
          <Button type="primary" onClick={onEditTemplate}>
            Edit
          </Button>
          <Button
            type="default"
            onClick={onResetSelectedTemplate}
            className="btn-change-template"
          >
            Change Template
          </Button>
          <Button
            type="default"
            onClick={onClickPreviewTemplate}
            className="btn-change-template"
          >
            Preview
          </Button>
        </div>
      </SavedBlock>
    );
  };

  return (
    <div id="tesststs">
      <Button onClick={() => setIsModalVisible(!isModalVisible)}>Show</Button>
      <Modal
        title="Select template"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="70vw"
      >
        <Tabs
          defaultActiveKey={TEMPLATE_TYPE.gallery.value}
          activeKey={activeTab}
          onChange={onChangeTab}
        >
          {Object.values(TEMPLATE_TYPE).map((type) => (
            <TabPane tab={type.label} key={type.value}>
              <MediaTemplateSelect>
                {isSaved ? (
                  renderSavedBlock()
                ) : (
                  <>
                    {renderTypes()}
                    {renderTemplates()}
                  </>
                )}
              </MediaTemplateSelect>
            </TabPane>
          ))}
        </Tabs>
        <DrawerMediaTemplate
          visible={isDrawerVisible}
          onClose={onCloseDrawer}
          selectedTemplate={selectedTemplate}
          onApplyTemplate={onApplyTemplate}
        />
      </Modal>
    </div>
  );
};

export default Gallery;
