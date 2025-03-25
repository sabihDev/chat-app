import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, UserPlus, Search, Check, X } from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    getFriendRequests,
    friends = {},
    friendRequests = [],
    sendFriendRequest,
    respondToFriendRequest,
    searchUsers,
    selectedUser,
    setSelectedUser,
    isFriendsLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getUsers();
    getFriendRequests();
  }, [getUsers, getFriendRequests, sendFriendRequest, respondToFriendRequest]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchUsers(searchQuery);
      setSearchResults(results || []);
    } else {
      setSearchResults([]);
    }
  };

  if (isFriendsLoading) return <SidebarSkeleton />;

  const friendsList = Array.isArray(friends.friends) ? friends.friends : [];
  const filteredUsers = showOnlineOnly
    ? friendsList.filter((user) => onlineUsers.includes(user._id))
    : friendsList;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({Math.max(onlineUsers.length - 1, 0)} online)</span>
        </div>

        <div className="relative mt-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search users..."
            className="input input-sm w-full"
          />
          <button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search className="size-4 text-zinc-500" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {friendRequests.length > 0 && (
          <div className="border-b border-base-300 pb-3">
            <h3 className="text-sm font-medium px-3 mb-2">Friend Requests</h3>
            {friendRequests.map((request) => (
              <div key={request._id} className="w-full p-3 flex items-center gap-3">
                <img
                  src={request.sender.profilePic || "/avatar.png"}
                  alt={request.sender.fullName}
                  className="size-12 object-cover rounded-full"
                />
                <div className="text-left min-w-0">
                  <div className="font-medium truncate">{request.sender.fullName}</div>
                </div>
                <button
                  onClick={() => respondToFriendRequest(request.sender._id, "accepted")}
                  className="text-green-500 hover:text-green-600"
                >
                  <Check className="size-5" />
                </button>
                <button
                  onClick={() => respondToFriendRequest(request.sender._id, "rejected")}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="size-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div key={user._id} className="w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors relative">
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
                {/* Online status indicator */}
                <span
                  className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white ${
                    onlineUsers.includes(user._id) ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
              </div>
              <button
                onClick={() => sendFriendRequest(user._id)}
                className="ml-auto text-blue-500 hover:text-blue-600"
              >
                <UserPlus className="size-5" />
              </button>
            </div>
          ))
        ) : (
          friendsList.length > 0 ? (
            friendsList.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors relative
                  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
              >
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-12 object-cover rounded-full"
                  />
                  {/* Online status indicator */}
                  <span
                    className={`absolute bottom-1 right-1 size-3 rounded-full border-2 border-white ${
                      onlineUsers.includes(user._id) ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <p className="text-base-content/50 text-sm">{
                      onlineUsers.includes(user._id) ? "Online" : "Offline"
                    }</p>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center text-zinc-500 py-4">
              {showOnlineOnly ? "No online users" : "No contacts available"}
            </div>
          )
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
