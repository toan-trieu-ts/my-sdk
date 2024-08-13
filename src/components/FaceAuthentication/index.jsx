import { Fragment, useState } from "react";
import Section from "../Section";
import renderImage from "../../utils/renderImage";

const FaceAuthentication = ({ webSdkRef }) => {
  const [mode, setMode] = useState(TVWebSDK.Constants.FaceAuthenticationMode.AUTHENTICATION);
  const [authMode, setAuthMode] = useState(TVWebSDK.Constants.FaceAuthMethod.EDGE_AUTHEN);

  const [authResult, setAuthResult] = useState({});

  const onDetect = () => {
    webSdkRef.current?.faceAuthentication({
      mode,
      authMode,
      onDone: (result) => {
        setAuthResult(result);
        webSdkRef.current?.destroyView();
      },
    });
  };

  const onChangeMode = (e) => {
    setMode(e?.target?.value);
  };

  const onChangeAuthMode = (e) => {
    setAuthMode(e?.target?.value);
  };

  return (
    <Section title="Face Authentication">
      <div>
        Mode{" "}
        <select value={mode} onChange={onChangeMode}>
          <option value={TVWebSDK.Constants.FaceAuthenticationMode.REGISTRATION}>Registeration</option>
          <option value={TVWebSDK.Constants.FaceAuthenticationMode.AUTHENTICATION}>Authentication</option>
        </select>
      </div>

      <div>
        Auth mode{" "}
        <select value={authMode} onChange={onChangeAuthMode}>
          <option value={TVWebSDK.Constants.FaceAuthMethod.STANDARD_AUTHEN}>Standard</option>
          <option value={TVWebSDK.Constants.FaceAuthMethod.ADVANCED_AUTHEN_ACTIVE}>Advanced</option>
          <option value={TVWebSDK.Constants.FaceAuthMethod.EDGE_AUTHEN}>Edge</option>
          <option value={TVWebSDK.Constants.FaceAuthMethod.ADVANCED_AUTHEN_FLASH}>Advanced flash</option>
          <option value={TVWebSDK.Constants.FaceAuthMethod.LIGHT_AUTHEN}>Light</option>
        </select>
      </div>

      <button onClick={onDetect}>Start</button>

      {Object.keys(authResult).length > 0 && (
        <div>
          <div>
            <h4>Frontal faces</h4>
            {authResult.frontalFaces?.map((faceImage, index) => {
              return <Fragment key={index}>{renderImage(faceImage)}</Fragment>;
            })}
          </div>

          <div>
            <h4>Directional faces</h4>
            {authResult.steps?.map((faceImage, index) => {
              return <Fragment key={index}>{renderImage(faceImage.image.blob)}</Fragment>;
            })}
          </div>
        </div>
      )}
    </Section>
  );
};

export default FaceAuthentication;
