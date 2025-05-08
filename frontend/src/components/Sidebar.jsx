import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SideBarSkeleton";

const Sidebar = () => {
  const { users, getUsers, getSelectedUser, isUserLoading, selectedUser } =
    useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;
  return <div>Sidebar</div>;
};

export default Sidebar;
