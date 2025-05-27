import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Category,
  CategorySchema,
  ALLOWED_CATEGORIES_FOR_FORM,
} from "@/types/feedback";
import StarRating from "@/components/star-rating";

const feedbackSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: CategorySchema,
  rating: z.coerce
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface AddFeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => void;
}

export const FeedbackForm: React.FC<AddFeedbackFormProps> = ({ onSubmit }) => {
  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: "",
      description: "",
      category: null,
      rating: 0,
    },
  });

  const processSubmit = (data: FeedbackFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processSubmit)}
        className="space-y-4 py-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="rounded-[5px]"
                  placeholder="Enter feedback title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your feedback in detail..."
                  className="resize-none rounded-[5px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide as much detail as possible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-[5px]"
                    >
                      {field.value ? field.value : "Select a category"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-white text-gray-700"
                    align="start"
                  >
                    <DropdownMenuRadioGroup
                      value={field.value ?? ""}
                      onValueChange={(value) => {
                        field.onChange(
                          value === "NONE_CATEGORY_OPTION"
                            ? null
                            : (value as Exclude<Category, null>)
                        );
                      }}
                    >
                      {ALLOWED_CATEGORIES_FOR_FORM.map((cat) => (
                        <DropdownMenuRadioItem key={cat} value={cat}>
                          {cat}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormDescription>
                Helps us categorize your feedback.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <StarRating value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Rate your experience or the importance of this feedback.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="rounded-[5px]">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="rounded-[5px]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Adding..." : "Add Feedback"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
