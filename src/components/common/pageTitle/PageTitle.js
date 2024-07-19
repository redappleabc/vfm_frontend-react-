import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PageTitle = ({ children }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>VFM | {children}</title>
      <meta name='description' content='SoTru application' />
    </Helmet>
  );
};
