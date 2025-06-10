import LanguageList from "./components/LanguageList";

export default function LanguageSettingsPage() {
  return (
    <div className="container py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Select Your Language</h1>
      <LanguageList />
    </div>
  );
}
