import { Spin } from "antd";
import styled from "styled-components";

export const MediaTemplateSelect = styled.div`
  border: solid 1px #ddd;
  img {
    max-height: 100%;
  }
`;

export const WrapperBlockTypes = styled.div`
  display: flex;
  align-items: center;
  background-color: #edeef7;
`;

export const BlockType = styled.div`
  background-color: red;
  margin: 16px 0 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 130px;
  background-color: #fff;
  cursor: pointer;
  border: ${(props) => (props.isSelected ? "2px solid #005eb8" : "")};
`;
export const GridContainer = styled.div`
  /* position: relative; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: 268px;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 16px !important;
  cursor: pointer;
  &:hover {
    .template-buttons {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .layer {
      display: block;
    }
  }
  .template-buttons {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    .btn-template {
      width: 135px;
      margin-bottom: 16px;
    }
    .btn-preview {
      width: 85px;
      background-color: #fff;
    }
  }
  .layer {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
  }
`;

export const TemplateBlock = styled.div`
  position: relative;
  height: 200px;
  border: solid 1px #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const SavedBlock = styled.div`
  width: 534px;
  height: 327px;
  border: solid 1px black;
  position: relative;
  display: flex;
  align-items: center;
  .btn-group {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 8px;
    margin-left: 16px;
    .bg-white {
      background-color: #fff;
    }
    .btn-change-template {
      margin-left: 12px;
      /* className="m-left-3 bg-white" */
    }
  }
  img {
    max-height: 100%;
  }
`;

export const StyledSpin = styled(Spin)`
  max-height: 100% !important;
`;
