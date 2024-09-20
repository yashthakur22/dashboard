import React from 'react';

type StatusType = 'PENDING' | 'CALLING' | 'COMPLETE' | 'NO_ANSWER' | 'INCOMPLETE';

interface StatusBadgeProps {
  status: StatusType;
}

const statusColors: Record<StatusType, string> = {
  PENDING: 'bg-yellow-500',
  CALLING: 'bg-blue-500',
  COMPLETE: 'bg-green-500',
  NO_ANSWER: 'bg-red-500',
  INCOMPLETE: 'bg-gray-500',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full mr-2 ${statusColors[status]}`}></div>
      <span className="text-sm font-medium">{status}</span>
    </div>
  );
};

export default StatusBadge;