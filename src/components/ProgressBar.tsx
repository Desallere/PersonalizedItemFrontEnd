import React from 'react';

interface Props {
  answered: number;
  total: number;
}

const ProgressBar: React.FC<Props> = ({ answered, total }) => {
  const percent = Math.round((answered / total) * 100);
  return (
    <div className="position-fixed top-0 start-0 w-100 bg-light" style={{ zIndex: 1000 }}>
      <div className="progress" style={{ height: '8px' }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={answered}
          aria-valuemin={0}
          aria-valuemax={total}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
