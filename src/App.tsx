import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FeedbackForm,
  type FeedbackFormData,
} from "@/components/feedback-form";
import StarRating from "@/components/star-rating";
import { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Category } from "@/types/feedback";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface FeedbackProps {
  id: number;
  title: string;
  description: string;
  category: Category;
  rating: number;
  created_at: number;
}

const initialFeedback: FeedbackProps[] = [
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
  const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>(initialFeedback);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRatingUpdate = useCallback(
    (feedbackId: number, newRating: number) => {
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((fb) =>
          fb.id === feedbackId ? { ...fb, rating: newRating } : fb
        )
      );
    },
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (category: Category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleAddFeedback = (data: FeedbackFormData) => {
    const newFeedback: FeedbackProps = {
      ...data,
      id:
        feedbacks.length > 0 ? Math.max(...feedbacks.map((f) => f.id)) + 1 : 1,
      created_at: Date.now(),
    };
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
    setIsModalOpen(false);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  const displayedFeedbacks = useMemo(() => {
    let filtered = [...feedbacks];

    if (searchTerm.trim() !== "") {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (fb) =>
          fb.title.toLowerCase().includes(lowerSearchTerm) ||
          fb.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((fb) => fb.category === selectedCategory);
    }
    return filtered;
  }, [feedbacks, searchTerm, selectedCategory]);
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
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search feedback"
        />
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className=" text-white px-4 py-2 rounded">
          + New Feedback
        </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-full text-gray-700 bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Feedback</DialogTitle>
              <DialogDescription>
                Share your thoughts to help us improve our product.
              </DialogDescription>
            </DialogHeader>
            <FeedbackForm onSubmit={handleAddFeedback} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-[50px] flex items-center gap-2">
        {selectedCategory && (
          <span className="text-sm text-white">
            Filtering by category:{" "}
            <Button className=" rounded-full" onClick={clearCategoryFilter}>
              {selectedCategory}
              <X />
            </Button>
          </span>
        )}
      </div>
      <ul className="space-y-4 pt-2">
        {displayedFeedbacks.map((fb) => (
          <li key={fb.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg text-gray-600 font-semibold">
                  {fb.title}
                </h2>
                <p className="text-sm text-gray-600">{fb.description}</p>
                <Badge
                  className="cursor-pointer"
                  onClick={() => handleCategoryFilter(fb.category)}
                  role="button"
                >
                  {fb.category}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <StarRating
                  value={fb.rating}
                  onChange={(rating) => handleRatingUpdate(fb.id, rating)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
