import { format } from 'date-fns';

import type { MonthTitleProps } from '../../../../types/post.types';

export const MonthTitle = ({ currentMonth }: MonthTitleProps) => {
  return (
    <h2 id="calendar-modal-title" className="text-2xl font-semibold mb-6 text-center">
      {format(currentMonth, 'MMMM yyyy')}
    </h2>
  );
};