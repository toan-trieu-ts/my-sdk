import { Fragment, useState } from "react";
import Section from "../Section";
import renderImage from "../../utils/renderImage";

const ExtractIDInfo = ({ webSdkRef }) => {
  const [idInfoList, setIdInfoList] = useState([]);

  const onExtract = () => {
    setIdInfoList([]);
    const steps = TVWebSDK.defaultReadIDCardSteps.length;

    const onStepDone = async (idInfo) => {
      setIdInfoList((list) => [...list, idInfo]);

      if (idInfo.stepNumber === steps - 1) {
        webSdkRef.current?.destroyView();
      }
    };
    webSdkRef.current?.readIDCardUIOnly({
      onStepDone: onStepDone,
    });
  };

  return (
    <Section title="Extract ID Info">
      <button onClick={onExtract}>Start</button>
      {idInfoList.length > 0 && (
        <h4>
          Result:
          {idInfoList.map((info) => {
            return (
              <Fragment key={info.stepNumber}>
                {renderImage(info.image.blob)}
              </Fragment>
            );
          })}
        </h4>
      )}
    </Section>
  );
};

export default ExtractIDInfo;
