import { Fragment, useRef, useState } from "react";
import Section from "../Section";
import renderImage from "../../utils/renderImage";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ExtractIDInfo = ({ webSdkRef }) => {
  const [idInfoList, setIdInfoList] = useState([]);
  const frontImageRef = useRef(null);

  const onFrontImageCaptured = async (image) => {
    await wait(1000);
    frontImageRef.current = image;
  }

  const onBackImageCaptured = async (image) => {
    console.log(frontImageRef);
  }

  const onExtract = () => {
    setIdInfoList([]);
    const steps = TVWebSDK.defaultReadIDCardSteps.length;

    const onStepDone = async (idInfo) => {
      if (idInfo && idInfo.cardSide == 'front') {
        await onFrontImageCaptured(idInfo);
      }
      if (idInfo && idInfo.cardSide == 'back') {
        await onBackImageCaptured(idInfo);
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
