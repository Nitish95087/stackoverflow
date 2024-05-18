"use client";
import { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editUserSchema } from "@/lib/validation";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/lib/action/user.action";
import { useRouter } from "next/navigation";

interface EditProfileProps {
  name: string;
  clerkId: string;
  username: string;
  portfolioLink: string;
  location: string;
  bio: string;
}

const EditProfile = (params: EditProfileProps) => {
  const { name, clerkId, username, portfolioLink, location, bio } = params;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullname: name || "",
      username: username || "",
      portfolioLink: portfolioLink || "",
      location: location || "",
      bio: bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof editUserSchema>) {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId: JSON.parse(clerkId),
        updatedData: {
          name: values.fullname || "",
          username: values.username || "",
          portfolioLink: values.portfolioLink,
          location: values.location,
          bio: values.bio,
        },
        path: `/profile/${JSON.parse(clerkId)}`,
      });
      router.push(`/profile/${JSON.parse(clerkId)}`);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark200_light900">
                Full Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="background-light800_darkgradient rounded-xl px-4 shadow-light-300 dark:shadow-none">
                <Input {...field} className="no-focus text-dark400_light700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark200_light900">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="background-light800_darkgradient rounded-xl px-4 shadow-light-300 dark:shadow-none">
                <Input {...field} className="no-focus text-dark400_light700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark200_light900">
                Portfolio Link
              </FormLabel>
              <FormControl className="background-light800_darkgradient rounded-xl px-4 shadow-light-300 dark:shadow-none">
                <Input {...field} className="no-focus text-dark400_light700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark200_light900">Location</FormLabel>
              <FormControl className="background-light800_darkgradient rounded-xl px-4 shadow-light-300 dark:shadow-none">
                <Input {...field} className="no-focus text-dark400_light700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark200_light900">Bio</FormLabel>
              <FormControl className="background-light800_darkgradient rounded-xl px-4 shadow-light-300 dark:shadow-none">
                <Textarea
                  {...field}
                  className="no-focus text-dark400_light700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfile;
