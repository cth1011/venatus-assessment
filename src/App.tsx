import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const initialFeedback = [
  {
    id: 1,
    title: "Add dark mode",
    description:
      "Allow users to toggle dark mode for better accessibility at night.",
    category: "Feature",
    rating: 4,
    created_at: new Date("2024-05-01T10:00:00Z").getTime(),
  },
  {
    id: 2,
    title: "Improve mobile layout",
    description: "Optimize the layout for smaller screens.",
    category: "UX",
    rating: 3,
    created_at: new Date("2024-05-05T14:30:00Z").getTime(),
  },
];

function App() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Product Feedback Board</h1>
      </header>
      <div className="flex flex-col mb-4 sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Search feedback..."
          className="flex-1 w-full sm:w-64 px-4 py-2 border border-gray-300 rounded"
        />
        <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Feedback
        </Button>
      </div>
      <ul className="space-y-4">
        {initialFeedback.map((fb) => (
          <li key={fb.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg text-gray-600 font-semibold">
                  {fb.title}
                </h2>
                <p className="text-sm text-gray-600">{fb.description}</p>
                <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {fb.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-yellow-500 ${
                      star <= fb.rating ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
