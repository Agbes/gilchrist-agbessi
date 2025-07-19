import TopicForm from "@/components/Admin/Topic/TopicForm";

export default function CreateTopicPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Ajouter un nouveau Topic</h1>
        <TopicForm />
      </div>
    </div>
  );
}
