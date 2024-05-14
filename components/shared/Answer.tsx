"use client";
import { z } from "zod";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useTheme from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/action/answer.action";
import { AnswerProps } from "@/lib/action/shared.types";
import { usePathname } from "next/navigation";
import { answerSchema } from "@/lib/validation";

const Answer = ({ questionId, authorId }: AnswerProps) => {
  const { mode } = useTheme();
  const pathname = usePathname();

  const editorRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    try {
      setIsSubmitting(true);
      await createAnswer({
        params: {
          author: JSON.parse(authorId),
          question: JSON.parse(questionId),
          answerContent: values.answer,
        },
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="">
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button className="background-light800_dark400 text-primary-500 dark:text-primary-500">
          <Image
            src={"/assets/icons/stars.svg"}
            alt="star"
            width={20}
            height={20}
          />
          <span className="ml-2">Gererate AI Answer</span>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
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
                    initialValue=""
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormMessage className="mt-2 text-red-500" />
              </FormItem>
            )}
          />
          <Button
            className="primary-gradient text-dark300_light900"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Answer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
