import { useEffect, useRef } from "react";
import ExtractIDInfo from "./components/ExtractIDInfo";
import LivenessDetection from "./components/LivenessDetection";

function App() {
  const refTVWebSDK = useRef(null);
  
  useEffect(() => {
    refTVWebSDK.current = new TVWebSDK.SDK({
      container: document.getElementById("web-sdk-container"),
      lang: "vi",
      assetRoot: "https://unpkg.com/@tsocial/tvweb-sdk@latest/assets",
    });
    refTVWebSDK.current?.runPreloadEKYCResources();
  }, []);

  return (
    <>
      <div id="web-sdk-container" />

      <ExtractIDInfo webSdkRef={refTVWebSDK} />

      <LivenessDetection webSdkRef={refTVWebSDK} />
    </>
  );
}

export default App;
