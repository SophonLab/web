import React from "react";
import { observer } from "mobx-react";
import BuildResult from "./BuildResult";
import BuildForm from "./BuildForm";

export default observer(function BuildComponent({ model }) {
  if (model.isBuilt) {
    return (
      <BuildResult
        styled={model.styledImageUrl}
        style={model.previewStyleImageUrl}
        origin={model.originImageUrl}
        onBuildAgain={model.reset}
      />
    );
  } else {
    return (
      <BuildForm
        isBuilding={model.isBuilding}
        onBuild={model.build}
        showError={model.showError}
        criticalError={model.criticalError}
        accessToken={model.accessToken}
        uploadUrl={model.uploadUrl}
        originImageUrl={model.originImageUrl}
        onOriginalImageUploadSucceed={model.setOriginImageUrl}
        onOriginalImageUploadFailed={model.refreshAccessToken}
        onOriginalImageUploadReset={model.resetOriginImageUrl}
        mixingLevel={model.mixingLevel}
        onSetMixingLevel={model.setMixingLevel}
        styleType={model.styleType}
        onStyleTypeChange={model.changeStyleType}
        styleImageUrl={model.styleImageUrl}
        onStyleImageUploadSucceed={model.setStyleImageUrl}
        onStyleImageUploadFailed={model.refreshAccessToken}
        onStyleImageUploadReset={model.resetStyleImageUrl}
        selectedStyle={model.selectedStyle}
        onSetSelectedStyle={model.setSelectedStyle}
      />
    );
  }
});
