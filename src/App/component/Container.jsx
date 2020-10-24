import React from 'react';
import Sidebar from './Sidebar';

export default function({ children }) {
  return (
    <div>
      <Sidebar/>
      {children}
    </div>
  )
}