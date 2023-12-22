import React from 'react'
import SidebarHeader from './SidebarHeader'
import Notification from './Notification';

const Sidebar = () => {
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notifications */}
      <Notification/>
    </div>
  );
}

export default Sidebar