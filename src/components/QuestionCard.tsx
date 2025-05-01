import React from 'react';
import { Option } from '../services/api';

interface Props {
  text: string;
  options: Option[];
  selected?: string;
  onSelect: (choiceId: string) => void;
}

const QuestionCard: React.FC<Props> = ({ text, options, selected, onSelect }) => (
  <div className="card mb-3">
    <div className="card-body">
      <p className="card-text"><strong>{text}</strong></p>

      {/* Grid wrapper: one button per "row", full width */}
      <div className="d-grid gap-2">
        {options.map(opt => (
          <button
            key={opt.optionId}
            className={
              `btn ` +
              (selected === opt.optionId
                ? 'btn-success'
                : 'btn-outline-secondary')
            }
            style={{ width: '100%' }}
            onClick={() => onSelect(opt.optionId)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default QuestionCard;
