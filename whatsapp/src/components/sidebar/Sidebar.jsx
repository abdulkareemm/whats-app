import React from 'react'
import SidebarHeader from './SidebarHeader'
import Notification from './Notification';
import {Search} from './search';

const Sidebar = () => {
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notifications */}
      <Notification />
      {/* search */}
      <Search searchLength  ="0"/>
    </div>
  );
}

export default Sidebar