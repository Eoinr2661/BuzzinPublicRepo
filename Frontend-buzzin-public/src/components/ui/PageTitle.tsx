import React from 'react';

import type { PageTitleProps } from '../../../types/post.types';

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="flex justify-start">
      <h1 className="inline-block text-3xl md:text-4xl my-2 font-bold font-Montserrat-VariableFont py-2 px-4 text-center rounded-xl bg-buzzin-purple-500 text-buzzin-lime-300">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
