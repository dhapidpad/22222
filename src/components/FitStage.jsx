import React from 'react';
import useLayoutMode from '../hooks/useLayoutMode';

export function FitStage({ children }) {
  const layoutMode = useLayoutMode();

  if (layoutMode === 'mobile') {
    return (
      <div className="w-full min-h-screen bg-[#F7FCFB] text-[#12343B] overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    );
  }

  // Desktop / Presentation mode: 100% full screen edge-to-edge, NO letterbox margins!
  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#F7FCFB] text-[#12343B] overflow-hidden select-none flex flex-col">
      {children}
    </div>
  );
}

export default FitStage;
