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
        origin={model.styledImageUrl}
        onBuildAgain={model.reset}
      />
    );
  } else {
    return (
      <BuildForm
        isBuilding={model.isBuilding}
        hasError={model.hasError}
        errorMessage={model.errorMessage}
        mixingLevel={model.mixingLevel}
        selectedStyle={model.selectedStyle}
        uploadUrl={model.uploadUrl}
        onSetSelectedStyle={model.setSelectedStyle}
        onSetMixingLevel={model.setMixingLevel}
        onBuild={model.build}
      />
    );
  }
});
