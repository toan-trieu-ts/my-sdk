import { Fragment, useState } from "react";
import Section from "../Section";
import renderImage from "../../utils/renderImage";

const LivenessDetection = ({ webSdkRef }) => {
  const [mode, setMode] = useState(TVWebSDK.Constants.Mode.ACTIVE);
  const [detectionResult, setDetectionResult] = useState({});

  const onDetect = () => {
    webSdkRef.current?.livenessDetection({
      mode,
      onLivenessDetectionDone: (result) => {
        setDetectionResult(result);
        webSdkRef.current?.destroyView();
      },
    });
  };

  const onChangeMode = (e) => {
    setMode(e?.target?.value);
  };

  return (
    <Section title="Liveness Detection">
      <div>
        Mode{" "}
        <select value={mode} onChange={onChangeMode}>
          <option value={TVWebSDK.Constants.Mode.ACTIVE}>Active</option>
          <option value={TVWebSDK.Constants.Mode.PASSIVE}>Passive</option>
        </select>
      </div>
      <button onClick={onDetect}>Start</button>

      {Object.keys(detectionResult).length > 0 && (
        <div>
          <div>
            <h4>Frontal faces</h4>
            {detectionResult.frontalFaces?.map((faceImage, index) => {
              return <Fragment key={index}>{renderImage(faceImage)}</Fragment>;
            })}
          </div>

          <div>
            <h4>Directional faces</h4>
            {detectionResult.steps?.map((faceImage, index) => {
              return <Fragment key={index}>{renderImage(faceImage.image.blob)}</Fragment>;
            })}
          </div>
        </div>
      )}
    </Section>
  );
};

export default LivenessDetection;
