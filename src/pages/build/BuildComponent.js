import React from "react";
import { observer } from "mobx-react";
import BuildResult from "./BuildResult";
import BuildForm from "./BuildForm";

export default observer(function BuildComponent({ model }) {
  if (model.isBuilt) {
    return (
      <BuildResult
        styled={model.styledImageUrl}
        style={`/style-images/${model.selectedStyle}.jpg`}
        origin={model.originImageUrl}
        onBuildAgain={model.reset}
      />
    );
  } else {
    return (
      <BuildForm
        isBuilding={model.isBuilding}
        showError={model.showError}
        criticalError={model.criticalError}
        originImageId={model.originImageId}
        mixingLevel={model.mixingLevel}
        selectedStyle={model.selectedStyle}
        uploadUrl={model.uploadUrl}
        onSetSelectedStyle={model.setSelectedStyle}
        onSetMixingLevel={model.setMixingLevel}
        onBuild={model.build}
        onUploadSucceed={model.setOriginImage}
        onUploadReset={model.resetOriginImage}
      />
    );
  }
});
