import React, { useEffect, useRef } from 'react';
import './App.css';
import { parserObjects } from './modelDefinition/model';
import { ParametricInput } from './Components/parametrics/ParametricInput';
import { useData } from './state/state';
import { ThreeCanvas } from './webgl/ThreeCanvas';
import { useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import { LiaFileDownloadSolid } from 'react-icons/lia';
import { enumSemantics } from './modelDefinition/types/methodSemantics';

const defaultState = 'CgPAFZGQnEE4gzdVAAEQAAA1AAOIAAADHSw5TZ2JoNf_______9MHave4an4inspirational4xMas88and4all4the4best4into4the4new4year46788love4Jonas';

export const App: React.FC = () => {
  const { stateString } = useParams();
  const data = useData((s) => s.data);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    window.history.replaceState(null, 'Same Page Title', `/a-merry-fx-mesh/#${parserObjects.stringify(data)}`);
  }, [data]);

  useEffect(() => {
    if (stateString) {
      try {
        useData.getState().setData(parserObjects.parser(stateString));
      } catch (e) {
        try {
          useData.getState().setData(parserObjects.parser(defaultState));
          message.warning('the state string you tried to use was not valid, using the default state instead');
        } catch (e) {
          useData.getState().setData(parserObjects.parser());
          message.error('the default!! state string was not valid, using the default object state instead');
        }
      }
    } else {
      try {
        useData.getState().setData(parserObjects.parser(defaultState));
      } catch (e) {
        useData.getState().setData(parserObjects.parser());
        message.error('the default!! state string was not valid, using the default object state instead');
      }
    }
  }, []);

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `a-merry-fx-mesh.${parserObjects.stringify(data)}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <>
      <ThreeCanvas canvasRef={canvasRef} />
      <Button style={{ position: 'fixed', top: '15px', right: '15px' }} onClick={downloadPNG}>
        <LiaFileDownloadSolid style={{ position: 'absolute', width: 20, height: 20 }} size={16} />
      </Button>
      <ParametricInput versionEnumSemantics={enumSemantics} />
    </>
  );
};
