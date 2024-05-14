"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { questionSchema } from "@/lib/validation";
import TagButton from "../shared/TagButton";
import { Editor } from "@tinymce/tinymce-react";
import useTheme from "@/context/ThemeProvider";
import { createQuestion, editQuestion } from "@/lib/action/question.action";
import { usePathname, useRouter } from "next/navigation";
import { QuestionProps } from "@/lib/action/shared.types";

const Question = ({
  type,
  author,
  title,
  explanation,
  tags,
  questionId,
}: QuestionProps) => {
  const { mode } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const editorRef = useRef(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: title || "",
      explanation: explanation || "",
      tags: tags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "Edit") {
        await editQuestion({
          _id: questionId!,
          updatedTitle: values.title,
          updatedContent: values.explanation,
        });
      } else {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          path: pathname,
          author: JSON.parse(author),
        });
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less then 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          return form.setError("tags", {
            type: "required",
            message: "This tag is already taken",
          });
        }
      } else {
        return form.setError("tags", {
          type: "required",
          message: "Please fill in the input field before proceeding.",
        });
      }
    }
  };

  const handleRemoveTag = (tag: string, field: string[]) => {
    const newTags = field.filter((item) => item !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your question
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editor.current = editor;
                    }}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter,font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                    initialValue={explanation || ""}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags<span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    placeholder="Add tags..."
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    onKeyDown={(e) => {
                      handleInputKeyDown(e, field);
                    }}
                    disabled={type === "Edit"}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  {type === "Edit"
                    ? "You can not edit tags"
                    : "Add up to 3 tags to describe what your question is about. You need to press enter to add a tag."}
                </FormDescription>

                {field.value.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    {field.value.map((item) => (
                      <TagButton
                        key={item}
                        tag={item}
                        field={field.value}
                        handleRemoveTag={handleRemoveTag}
                        isEdited={type === "Edit"}
                      />
                    ))}
                  </div>
                )}

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
            disabled={isSubmitting}
          >
            {type === "Edit"
              ? isSubmitting
                ? "Editing..."
                : "Edit Question"
              : isSubmitting
                ? "Posting..."
                : "Post Question"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
