interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-slate-600 px-2 py-1">
        <h4 className="font-medium">Settings</h4>
      </div>
    </div>
  );
};
export default Settings;
