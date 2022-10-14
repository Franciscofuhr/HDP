import React from 'react';
import { useState, useEffect } from "react";

export default function Countdown({startingSeconds, kingChooses, boolean}) {
  console.log(startingSeconds, 'secssss')

  const [secs, setSeconds] = useState(startingSeconds);
  useEffect(() => {
    setSeconds(startingSeconds)
  }, [kingChooses])
  
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if(kingChooses && boolean && secs > 0){
        setSeconds(secs - 1);
      } else if(kingChooses && boolean && secs === 0){
        setSeconds(startingSeconds);
      } else if (kingChooses) {
         setSeconds(startingSeconds)
      } else if (secs > 0) {
         setSeconds(secs - 1);
      } else if (secs === 0){
           setSeconds(startingSeconds);
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px'}}>
      {!(secs) ? "" : (
        <p style={{color: 'white', fontSize: '25px', fontWeight: 'bold'}}>
          {" "}   
          00:{secs < 10 ? `0${secs}` : secs}
        </p>
      )}
    </div>
  );
}