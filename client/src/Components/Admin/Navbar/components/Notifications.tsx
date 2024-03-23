interface NavBarProps {}

const Notifications: React.FC<NavBarProps> = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-slate-600 px-2 py-1">
        <h4 className="font-medium">Notifications</h4>
      </div>
      <div className="flex-1 overflow-y-auto scroll">
        <div className="bg-red-100 h-14"></div>
        <div className="bg-red-200 h-14"></div>
        <div className="bg-red-300 h-14"></div>
        <div className="bg-red-400 h-14"></div>
        <div className="bg-red-500 h-14"></div>
        <div className="bg-red-600 h-14"></div>
        <div className="bg-red-700 h-14"></div>
      </div>
      <div className="border-t border-slate-600 px-2 py-1">
        <h5 className="text-xs text-center">Notification history</h5>
      </div>
    </div>
  );
};
export default Notifications;
